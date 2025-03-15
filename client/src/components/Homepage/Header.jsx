import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, User, Bell } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md w-full sticky top-0 z-50">
      <div className="w-full px-0 sm:px-2">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 pl-2 sm:pl-0">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold text-indigo-600">
                TaskHub
              </span>
            </Link>
          </div>

          <div className="hidden md:block">
            <div className="flex items-center space-x-8">
              <Link
                to="/tasks"
                className="text-gray-600 hover:text-indigo-600 transition duration-200 font-medium text-sm"
              >
                Find Tasks
              </Link>
              <Link
                to="/post-task"
                className="text-gray-600 hover:text-indigo-600 transition duration-200 font-medium text-sm"
              >
                Post a Task
              </Link>
              <Link
                to="/about"
                className="text-gray-600 hover:text-indigo-600 transition duration-200 font-medium text-sm"
              >
                About
              </Link>
              <Link
                to="/contact"
                className="text-gray-600 hover:text-indigo-600 transition duration-200 font-medium text-sm"
              >
                Contact
              </Link>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            <button className="text-gray-500 hover:text-indigo-600 transition duration-200">
              <Bell className="h-5 w-5" />
            </button>
            <Link
              to="/profile"
              className="text-gray-500 hover:text-indigo-600 transition duration-200"
            >
              <User className="h-5 w-5" />
            </Link>
            <div className="ml-2">
              <appkit-button />
            </div>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-indigo-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              to="/tasks"
              className="block px-3 py-2 text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 rounded-md font-medium text-base transition duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              Find Tasks
            </Link>
            <Link
              to="/post-task"
              className="block px-3 py-2 text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 rounded-md font-medium text-base transition duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              Post a Task
            </Link>
            <Link
              to="/about"
              className="block px-3 py-2 text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 rounded-md font-medium text-base transition duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link
              to="/contact"
              className="block px-3 py-2 text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 rounded-md font-medium text-base transition duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
          </div>

          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="flex items-center px-5 space-x-4">
              <Link
                to="/profile"
                className="flex-shrink-0 text-gray-500"
                onClick={() => setIsMenuOpen(false)}
              >
                <User className="h-6 w-6" />
              </Link>
              <button
                className="text-gray-500"
                onClick={() => setIsMenuOpen(false)}
              >
                <Bell className="h-6 w-6" />
              </button>
              <div className="ml-auto">
                <appkit-button />
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;
