import React from 'react';
import { Clock, DollarSign, Users, Star, Bookmark, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const TaskCard = ({ task }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
      <div className="p-2">
        <div className="flex justify-between items-start p-4">
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${task.priority === 'High' ? 'bg-red-500' : task.priority === 'Medium' ? 'bg-yellow-500' : 'bg-green-500'}`} />
            <span className={`px-3 py-1 text-xs font-semibold rounded-full 
              ${task.category === 'Development' ? 'text-blue-600 bg-blue-50' :
              task.category === 'Design' ? 'text-purple-600 bg-purple-50' :
              task.category === 'Marketing' ? 'text-green-600 bg-green-50' :
              task.category === 'Writing' ? 'text-yellow-600 bg-yellow-50' :
              'text-gray-600 bg-gray-50'}`}>
              {task.category}
            </span>
          </div>
          <button className="text-gray-400 hover:text-indigo-600 transition-colors">
            <Bookmark className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="px-6 pb-6">
        <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-1">
          {task.title}
        </h3>
        
        <p className="text-gray-600 mb-4 line-clamp-2 text-sm">
          {task.description}
        </p>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-gray-50 p-3 rounded-lg">
            <div className="flex items-center text-gray-600">
              <DollarSign className="h-4 w-4 mr-2 text-indigo-500" />
              <span className="text-sm font-semibold">${task.budget}</span>
            </div>
            <p className="text-xs text-gray-500 mt-1">Budget</p>
          </div>
          <div className="bg-gray-50 p-3 rounded-lg">
            <div className="flex items-center text-gray-600">
              <Users className="h-4 w-4 mr-2 text-indigo-500" />
              <span className="text-sm font-semibold">{task.applicants}</span>
            </div>
            <p className="text-xs text-gray-500 mt-1">Applicants</p>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center">
            <div className="flex -space-x-2">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center">
                  <span className="text-xs text-gray-600 font-medium">U{i+1}</span>
                </div>
              ))}
            </div>
            <span className="text-xs text-gray-500 ml-2">+{task.applicants - 3} more</span>
          </div>
          
          <Link
            to={`/tasks/${task.id}`}
            className="flex items-center text-sm font-semibold text-indigo-600 hover:text-indigo-700 transition-colors"
          >
            View Details
            <ArrowRight className="h-4 w-4 ml-1" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;