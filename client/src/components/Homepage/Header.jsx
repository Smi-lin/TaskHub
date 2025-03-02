import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, User, Bell } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-indigo-600">TaskHub</span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link to="/tasks" className="text-gray-600 hover:text-indigo-600">
              Find Tasks
            </Link>
            <Link to="/post-task" className="text-gray-600 hover:text-indigo-600">
              Post a Task
            </Link>
            <Link to="/about" className="text-gray-600 hover:text-indigo-600">
              About
            </Link>
            <Link to="/contact" className="text-gray-600 hover:text-indigo-600">
              Contact
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <button className="p-2 text-gray-400 hover:text-indigo-600">
              <Bell className="h-6 w-6" />
            </button>
            <Link 
              to="/profile" 
              className="p-2 text-gray-400 hover:text-indigo-600"
            >
              <User className="h-6 w-6" />
            </Link>
            <Link
              to="/login"
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
            >
              Sign In
            </Link>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-400 hover:text-gray-500"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              to="/tasks"
              className="block px-3 py-2 text-gray-600 hover:bg-indigo-50 rounded-md"
            >
              Find Tasks
            </Link>
            <Link
              to="/post-task"
              className="block px-3 py-2 text-gray-600 hover:bg-indigo-50 rounded-md"
            >
              Post a Task
            </Link>
            <Link
              to="/about"
              className="block px-3 py-2 text-gray-600 hover:bg-indigo-50 rounded-md"
            >
              About
            </Link>
            <Link
              to="/contact"
              className="block px-3 py-2 text-gray-600 hover:bg-indigo-50 rounded-md"
            >
              Contact
            </Link>
            <Link
              to="/login"
              className="block px-3 py-2 bg-indigo-600 text-white rounded-md"
            >
              Sign In
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;