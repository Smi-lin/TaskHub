import React, { useState } from "react";
import TaskCard from "./TaskCard";
import { Search, Filter } from "lucide-react";
import Header from "./Header";
import Footer from "./Footer";

const TaskList = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const tasks = [
    {
      id: 1,
      title: "Wedding Dress Alteration and Design",
      description:
        "Need an experienced tailor to alter and modify a wedding dress. Requires adjusting the hem, taking in the bodice, and adding detailed beadwork.",
      budget: "800",
      deadline: "2024-04-15",
      category: "Tailoring",
      status: "Open",
      applicants: 8,
      priority: "High",
    },
    {
      id: 2,
      title: "Custom Wooden Wardrobe Construction",
      description:
        "Looking for a skilled carpenter to build a built-in wardrobe with multiple compartments, drawers, and hanging spaces. Materials to be discussed.",
      budget: "2,500",
      deadline: "2024-03-20",
      category: "Carpenter",
      status: "Open",
      applicants: 12,
      priority: "Medium",
    },
    {
      id: 3,
      title: "Metal Gate Fabrication Project",
      description:
        "Need a professional welder to fabricate and install a decorative metal gate for home entrance. Design includes scrollwork and security features.",
      budget: "1,800",
      deadline: "2024-03-25",
      category: "Welder",
      status: "Open",
      applicants: 6,
      priority: "Medium",
    },
    {
      id: 4,
      title: "Bridal Party Hair Styling",
      description:
        "Seeking a professional hairdresser for a wedding party of 5 people. Services include styling, updos, and makeup application for the event.",
      budget: "600",
      deadline: "2024-04-01",
      category: "Hairdressing",
      status: "Open",
      applicants: 15,
      priority: "High",
    },
    {
      id: 5,
      title: "E-commerce Website Interface Design",
      description:
        "Need a UI/UX designer to create an intuitive and modern interface for an online fashion store. Focus on mobile responsiveness and user experience.",
      budget: "1,500",
      deadline: "2024-03-18",
      category: "UI/Ux Designer",
      status: "Open",
      applicants: 4,
      priority: "Low",
    },
    {
      id: 6,
      title: "Custom Web Application Development",
      description:
        "Looking for a developer to build a customer management system with payment integration, reporting features, and user authentication.",
      budget: "3,000",
      deadline: "2024-04-10",
      category: "Developer",
      status: "Open",
      applicants: 9,
      priority: "Medium",
    },
    {
      id: 7,
      title: "Smartphone and Tablet Repairs",
      description:
        "Need an experienced repairer for multiple devices: 3 iPhones with screen damage and 2 iPads with battery issues. Parts will be provided.",
      budget: "400",
      deadline: "2024-03-30",
      category: "Repairer",
      status: "Open",
      applicants: 7,
      priority: "Medium",
    },
    {
      id: 8,
      title: "Car Engine Overhaul Service",
      description:
        "Required mechanic for complete engine overhaul of a 2018 Toyota Camry. Including replacement of gaskets, bearings, and timing belt.",
      budget: "2,200",
      deadline: "2024-03-22",
      category: "Mechanics",
      status: "Open",
      applicants: 11,
      priority: "Low",
    },
    {
      id: 9,
      title: "Tire Repair and Replacement Service",
      description:
        "Need vulcanizer for fleet maintenance - 5 vehicles requiring tire inspection, repair/replacement, and wheel balancing service.",
      budget: "500",
      deadline: "2024-04-20",
      category: "Vulcanizer",
      status: "Open",
      applicants: 13,
      priority: "High",
    },
    {
      id: 10,
      title: "Mathematics Home Tutoring",
      description:
        "Seeking an experienced teacher for private mathematics tutoring. Topics include algebra and calculus for high school student. 3 sessions per week.",
      budget: "300",
      deadline: "2024-04-05",
      category: "Teacher",
      status: "Open",
      applicants: 10,
      priority: "Medium",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
              <div className="relative flex-1 w-full">
                <input
                  type="text"
                  placeholder="Search tasks..."
                  className="w-full px-4 py-2 pl-10 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
              <button className="flex items-center px-4 py-2 text-gray-600 bg-white border rounded-lg hover:bg-gray-50">
                <Filter className="h-5 w-5 mr-2" />
                Filters
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tasks.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TaskList;
