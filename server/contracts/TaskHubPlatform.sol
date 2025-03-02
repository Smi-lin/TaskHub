// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract TaskHubPlatform is ReentrancyGuard {
    enum UserType { None, TaskOwner, TaskExecutor }
    enum TaskStatus { Open, Applied, Assigned, Completed, Approved, Closed, Cancelled, NeedsRevision, Rejected }

    struct User {
        bool isRegistered;
        bool isVerified;
        UserType userType;
        string skills; 
    }

    struct Application {
        address executor;
        string proposal;
        uint256 timestamp;
    }

    struct Task {
        address owner;
        string description;
        string requirements; 
        uint256 reward;
        TaskStatus status;
        address executor;
        string deliverable; 
        string revisionNotes;
        mapping(address => Application) applications; 
        address[] applicants; 
    }

    IERC20 public token;
    mapping(address => User) public users;
    Task[] public tasks;
    mapping(uint256 => uint256) public escrowBalance;
    
    // Escrow settings
    uint256 public platformFeePercentage = 5; // 5% platform fee
    uint256 public constant MAX_PERCENTAGE = 100;

    event UserRegistered(address user, UserType userType, string skills);
    event UserVerified(address user);
    event TaskCreated(uint256 taskId, address owner, string description, string requirements);
    event ApplicationSubmitted(uint256 taskId, address executor, string proposal);
    event TaskAssigned(uint256 taskId, address executor);
    event TaskCompleted(uint256 taskId, string deliverable);
    event TaskApproved(uint256 taskId);
    event TaskCancelled(uint256 taskId);
    event TaskRejected(uint256 taskId);
    event RevisionRequested(uint256 taskId, string revisionNotes);
    event FundsDeposited(uint256 taskId, uint256 amount);
    event FundsReleased(uint256 taskId, address recipient, uint256 amount);
    event FundsReturned(uint256 taskId, address recipient, uint256 amount);

    constructor(address _tokenAddress) {
        token = IERC20(_tokenAddress);
    }

    function registerUser(UserType _userType, string memory _skills) external {
        require(!users[msg.sender].isRegistered, "User already registered");
        users[msg.sender] = User(true, false, _userType, _skills);
        emit UserRegistered(msg.sender, _userType, _skills);
    }

    function verifyUser() external {
        require(users[msg.sender].isRegistered, "User not registered");
        users[msg.sender].isVerified = true;
        emit UserVerified(msg.sender);
    }

    function createTask(string memory _description, string memory _requirements, uint256 _reward) external nonReentrant {
        require(users[msg.sender].isVerified, "User must be verified");
        require(users[msg.sender].userType == UserType.TaskOwner, "Only task owners can create tasks");
        require(token.balanceOf(msg.sender) >= _reward, "Insufficient balance");
        
        // Transfer tokens to escrow
        require(token.transferFrom(msg.sender, address(this), _reward), "Token transfer failed");

        uint256 taskId = tasks.length;
        Task storage newTask = tasks.push();
        newTask.owner = msg.sender;
        newTask.description = _description;
        newTask.requirements = _requirements;
        newTask.reward = _reward;
        newTask.status = TaskStatus.Open;
        
        // Set escrow balance
        escrowBalance[taskId] = _reward;

        emit TaskCreated(taskId, msg.sender, _description, _requirements);
    }

    function applyForTask(uint256 _taskId, string memory _proposal) external {
        require(users[msg.sender].isVerified, "User must be verified");
        require(users[msg.sender].userType == UserType.TaskExecutor, "Must be task executor");
        Task storage task = tasks[_taskId];
        require(task.status == TaskStatus.Open, "Task not open for applications");

        task.applications[msg.sender] = Application(msg.sender, _proposal, block.timestamp);
        task.applicants.push(msg.sender);
        emit ApplicationSubmitted(_taskId, msg.sender, _proposal);
    }

    function assignTask(uint256 _taskId, address _executor) external {
        Task storage task = tasks[_taskId];
        require(msg.sender == task.owner, "Only owner can assign");
        require(task.status == TaskStatus.Open, "Task not open");
        require(task.applications[_executor].executor == _executor, "Executor hasn't applied");

        task.executor = _executor;
        task.status = TaskStatus.Assigned;
        emit TaskAssigned(_taskId, _executor);
    }

    function submitTask(uint256 _taskId, string memory _deliverable) external {
        Task storage task = tasks[_taskId];
        require(msg.sender == task.executor, "Only assigned executor can submit");
        require(task.status == TaskStatus.Assigned || task.status == TaskStatus.NeedsRevision, "Task not assigned or needing revision");

        task.deliverable = _deliverable;
        task.status = TaskStatus.Completed;
        emit TaskCompleted(_taskId, _deliverable);
    }

    function approveTask(uint256 _taskId) external nonReentrant {
        Task storage task = tasks[_taskId];
        require(msg.sender == task.owner, "Only owner can approve");
        require(task.status == TaskStatus.Completed, "Task not completed");

        task.status = TaskStatus.Approved;
        
        // Calculate platform fee
        uint256 platformFee = (task.reward * platformFeePercentage) / MAX_PERCENTAGE;
        uint256 executorPayment = task.reward - platformFee;
        
        // Transfer funds to executor
        require(token.transfer(task.executor, executorPayment), "Payment transfer failed");
        
        // Keep platform fee in contract (can be withdrawn by platform owner separately)
        
        task.status = TaskStatus.Closed;
        delete escrowBalance[_taskId];
        
        emit TaskApproved(_taskId);
        emit FundsReleased(_taskId, task.executor, executorPayment);
    }

    // 1. Mechanism to cancel task if not accepted by anyone
    function cancelTask(uint256 _taskId) external nonReentrant {
        Task storage task = tasks[_taskId];
        require(msg.sender == task.owner, "Only owner can cancel");
        require(task.status == TaskStatus.Open, "Can only cancel open tasks");
        require(task.applicants.length == 0, "Task has applicants");
        
        // Refund the task owner
        uint256 refundAmount = task.reward;
        require(token.transfer(task.owner, refundAmount), "Refund failed");
        
        task.status = TaskStatus.Cancelled;
        delete escrowBalance[_taskId];
        
        emit TaskCancelled(_taskId);
        emit FundsReturned(_taskId, task.owner, refundAmount);
    }
    
    // 2. Mechanism to reject task
    function rejectTask(uint256 _taskId) external nonReentrant {
        Task storage task = tasks[_taskId];
        require(msg.sender == task.owner, "Only owner can reject");
        require(task.status == TaskStatus.Completed, "Task not completed");
        
        // Set to rejected status
        task.status = TaskStatus.Rejected;
        
        // Return partial funds to task executor (e.g., 30% for the work done)
        uint256 partialPayment = (task.reward * 30) / MAX_PERCENTAGE;
        uint256 ownerRefund = task.reward - partialPayment;
        
        require(token.transfer(task.executor, partialPayment), "Partial payment failed");
        require(token.transfer(task.owner, ownerRefund), "Owner refund failed");
        
        delete escrowBalance[_taskId];
        
        emit TaskRejected(_taskId);
        emit FundsReleased(_taskId, task.executor, partialPayment);
        emit FundsReturned(_taskId, task.owner, ownerRefund);
    }
    
    // 3. Mechanism to ask for review if not done well
    function requestRevision(uint256 _taskId, string memory _revisionNotes) external {
        Task storage task = tasks[_taskId];
        require(msg.sender == task.owner, "Only owner can request revision");
        require(task.status == TaskStatus.Completed, "Task not completed");
        
        task.revisionNotes = _revisionNotes;
        task.status = TaskStatus.NeedsRevision;
        
        emit RevisionRequested(_taskId, _revisionNotes);
    }

    // Additional function to handle partial payments and disputes
    function resolveDispute(uint256 _taskId, uint256 _executorPercentage) external nonReentrant {
        
        Task storage task = tasks[_taskId];
        require(msg.sender == task.owner, "Only owner can resolve disputes");
        require(task.status == TaskStatus.Rejected || task.status == TaskStatus.NeedsRevision, "No active dispute");
        require(_executorPercentage <= MAX_PERCENTAGE, "Invalid percentage");
        
        uint256 executorPayment = (task.reward * _executorPercentage) / MAX_PERCENTAGE;
        uint256 ownerRefund = task.reward - executorPayment;
        
        require(token.transfer(task.executor, executorPayment), "Executor payment failed");
        require(token.transfer(task.owner, ownerRefund), "Owner refund failed");
        
        task.status = TaskStatus.Closed;
        delete escrowBalance[_taskId];
        
        emit FundsReleased(_taskId, task.executor, executorPayment);
        emit FundsReturned(_taskId, task.owner, ownerRefund);
    }
    
    // View function to get task details
    function getTaskDetails(uint256 _taskId) external view returns (
        address owner,
        string memory description,
        string memory requirements,
        uint256 reward,
        TaskStatus status,
        address executor,
        string memory deliverable,
        string memory revisionNotes,
        uint256 applicantCount
    ) {
        Task storage task = tasks[_taskId];
        return (
            task.owner,
            task.description,
            task.requirements,
            task.reward,
            task.status,
            task.executor,
            task.deliverable,
            task.revisionNotes,
            task.applicants.length
        );
    }
    
    // Get applicant at index
    function getApplicantAt(uint256 _taskId, uint256 _index) external view returns (address) {
        return tasks[_taskId].applicants[_index];
    }
    
    // Get application details
    function getApplication(uint256 _taskId, address _applicant) external view returns (
        address executor,
        string memory proposal,
        uint256 timestamp
    ) {
        Application storage app = tasks[_taskId].applications[_applicant];
        return (app.executor, app.proposal, app.timestamp);
    }
}