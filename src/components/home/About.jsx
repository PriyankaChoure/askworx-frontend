import React from 'react';

const About = () => {
  return (
    <section id="about" className="py-20 bg-blue-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold text-white mb-6">
              Market Analysis & Insights
            </h2>
            <p className="text-xl text-white mb-8">
              Analyze, Generate & Deliver
            </p>
            <p className="text-base text-white mb-8">
              Data of thousands of projects from all over the country every year.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
                <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">20000 +</div>
                <div className="text-lg font-semibold text-gray-900">Projects</div>
                <div className="text-sm text-gray-700">New and expansion of project will be made</div>
              </div>
              <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl">
                <div className="text-3xl md:text-4xl font-bold text-green-600 mb-2">100 CR +</div>
                <div className="text-lg font-semibold text-gray-900">Area (SqFt)</div>
                <div className="text-sm text-gray-700">Square feet area to be built</div>
              </div>
              <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl">
                <div className="text-3xl md:text-4xl font-bold text-purple-600 mb-2">300000 CR +</div>
                <div className="text-lg font-semibold text-gray-900">Cost (INR)</div>
                <div className="text-sm text-gray-700">Investors invest in infrastructure</div>
              </div>
            </div>
          </div>
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
              alt="Market Analysis"
              className="w-full h-96 object-cover rounded-2xl shadow-2xl"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-20 rounded-2xl"></div>
          </div>
        </div>
        {/* <div className="mt-16 text-center">
          <h3 className="text-2xl font-semibold text-white mb-4">
            The Project askworx covers from different states
          </h3>
          <p className="text-base text-white">
            Stage and Sector wise Project coverage
          </p>
        </div> */}
      </div>
    </section>
  );
};

export default About;