import React from 'react';

const CTA = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-gray-900 to-black text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <div className="absolute inset-0 bg-cover bg-center opacity-10" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')" }}></div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Form Section */}
          <div className="order-2 lg:order-1">
            <div className="bg-white bg-opacity-10 backdrop-blur-sm p-8 rounded-2xl border border-white border-opacity-20 shadow-2xl">
              <h3 className="text-2xl font-semibold mb-6">Ask For Trial</h3>
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full px-4 py-3 rounded-lg bg-white bg-opacity-20 border border-white border-opacity-30 text-white placeholder-white placeholder-opacity-70 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent transition-all duration-300"
                  />
                  <input
                    type="email"
                    placeholder="Your Email"
                    className="w-full px-4 py-3 rounded-lg bg-white bg-opacity-20 border border-white border-opacity-30 text-white placeholder-white placeholder-opacity-70 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent transition-all duration-300"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Company Name"
                    className="w-full px-4 py-3 rounded-lg bg-white bg-opacity-20 border border-white border-opacity-30 text-white placeholder-white placeholder-opacity-70 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent transition-all duration-300"
                  />
                  <input
                    type="tel"
                    placeholder="Your Phone"
                    className="w-full px-4 py-3 rounded-lg bg-white bg-opacity-20 border border-white border-opacity-30 text-white placeholder-white placeholder-opacity-70 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent transition-all duration-300"
                  />
                </div>
                <textarea
                  placeholder="Description"
                  rows="3"
                  className="w-full px-4 py-3 rounded-lg bg-white bg-opacity-20 border border-white border-opacity-30 text-white placeholder-white placeholder-opacity-70 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent transition-all duration-300 resize-none"
                ></textarea>
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold text-lg hover:from-blue-600 hover:to-purple-700 hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300 shadow-lg"
                >
                  Send Now
                </button>
              </form>
            </div>
          </div>

          {/* Text and Image Section */}
          <div className="order-1 lg:order-2 text-center lg:text-left">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              You are Missing thousands of projects whose cost is in crores
            </h2>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Share your details here to get a window of that opportunity
            </p>
            <div className="mb-8">
              <img
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Business opportunity illustration"
                className="w-full max-w-md mx-auto lg:mx-0 rounded-2xl shadow-2xl border border-white border-opacity-20"
              />
            </div>
            <p className="text-lg opacity-80">
              We help our clients succeed with our smart insights
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;