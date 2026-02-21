import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold mb-6 text-white">Company</h3>
            <ul className="space-y-3">
              <li><a href="#about" className="text-gray-300 hover:text-white transition-colors duration-300">About Us</a></li>
              <li><a href="#services" className="text-gray-300 hover:text-white transition-colors duration-300">Our Services</a></li>
              <li><a href="#plans" className="text-gray-300 hover:text-white transition-colors duration-300">Plan</a></li>
              <li><a href="#contact" className="text-gray-300 hover:text-white transition-colors duration-300">Contact us</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-6 text-white">Products</h3>
            <ul className="space-y-3">
              <li><a href="#services" className="text-gray-300 hover:text-white transition-colors duration-300">Industrial Project</a></li>
              <li><a href="#services" className="text-gray-300 hover:text-white transition-colors duration-300">Residential Project</a></li>
              <li><a href="#services" className="text-gray-300 hover:text-white transition-colors duration-300">Commercial Project</a></li>
              <li><a href="#services" className="text-gray-300 hover:text-white transition-colors duration-300">Government Project</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-6 text-white">Contact</h3>
            <div className="space-y-3 text-gray-300">
              <p className="flex items-center">
                <svg className="w-5 h-5 mr-2 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                +(91) 826-929-4031
              </p>
              <p className="flex items-center">
                <svg className="w-5 h-5 mr-2 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                contact@askworx.com
              </p>
              <p className="flex items-start">
                <svg className="w-5 h-5 mr-2 mt-1 text-blue-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                1104 Veer Savarkar heights ognaj road, gota, Ahmedabad-380060
              </p>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-6 text-white">Follow Us</h3>
            <div className="flex space-x-4">
              {/* eslint-disable jsx-a11y/anchor-is-valid */}
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors duration-300">
                <span className="text-white text-lg">📘</span>
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-400 transition-colors duration-300">
                <span className="text-white text-lg">🐦</span>
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-pink-500 transition-colors duration-300">
                <span className="text-white text-lg">📷</span>
              </a>
              <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors duration-300">
                <span className="text-white text-lg">💼</span>
              </a>
              {/* eslint-enable jsx-a11y/anchor-is-valid */}
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 pt-8 text-center">
          <p className="text-gray-400">&copy; Copyright Ask Worx. Design & Development By Hashcrypt Technologies</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;