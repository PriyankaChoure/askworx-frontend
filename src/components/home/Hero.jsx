import React from 'react';

const Hero = () => {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center bg-blue-100 text-gray-900 overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center opacity-20" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')" }}></div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight text-gray-900">
          How Ask Worx help your business?
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
          Enlarge your organizational coverage by finding authentic project information on our platform.
        </p>
        <button className="bg-blue-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-blue-700 hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300 shadow-lg">
          Get Started Today
        </button>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 max-w-6xl mx-auto">
          <div className="bg-white p-8 rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300">
            <h3 className="text-2xl font-semibold mb-4 text-gray-900">Step-1</h3>
            <h4 className="text-xl font-semibold mb-4 text-gray-800">Get Customer Detail</h4>
            <p className="text-base text-gray-600">Get entire detail of the project like Project officials, their contact numbers, locations, area and cost of project, ETC</p>
          </div>
          <div className="bg-white p-8 rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300">
            <h3 className="text-2xl font-semibold mb-4 text-gray-900">Step-2</h3>
            <h4 className="text-xl font-semibold mb-4 text-gray-800">Contact With Them</h4>
            <p className="text-base text-gray-600">Contact directly with the project officials to get the best deal through mails, telephone, one to one meeting and send brochures quotation, samples, etc</p>
          </div>
          <div className="bg-white p-8 rounded-xl border border-gray-200 hover:shadow-lg transition-all duration-300">
            <h3 className="text-2xl font-semibold mb-4 text-gray-900">Step-3</h3>
            <h4 className="text-xl font-semibold mb-4 text-gray-800">Get Order</h4>
            <p className="text-base text-gray-600">Get you purchase order, send pro-forma and term and condition.</p>
          </div>
        </div>
      </div>
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
};

export default Hero;