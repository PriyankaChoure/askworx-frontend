import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-gray-800">
              <img className="w-14 md:w-20 lg:w-32"
                src="/images/LogoNew.jpg"
                alt="AskWorx"
              />
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/" className="text-gray-700 hover:text-[#ad7429] hover:underline hover:font-bold px-3 py-2 rounded-md text-sm font-medium">
              Home
            </Link>
            <a href="/about" className="text-gray-700 hover:text-[#ad7429] hover:underline hover:font-bold px-3 py-2 rounded-md text-sm font-medium">
              About Us
            </a>
            <a href="/service" className="text-gray-700 hover:text-[#ad7429] hover:underline hover:font-bold px-3 py-2 rounded-md text-sm font-medium">
              Services
            </a>
            <a href="/plan" className="text-gray-700 hover:text-[#ad7429] hover:underline hover:font-bold px-3 py-2 rounded-md text-sm font-medium">
              Plans
            </a>
            <a href="/contact" className="text-gray-700 hover:text-[#ad7429] hover:underline hover:font-bold px-3 py-2 rounded-md text-sm font-medium">
              Contact Us
            </a>
            <Link to="/login" className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700">
              Login
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;