import React from 'react';

const Hero = () => {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center bg-blue-100 text-gray-900 overflow-hidden">
      {/* Background Video */}
      <video
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        poster="/images/contactorServie.jpg"
      >
        <source
          src="/videos/HomeBannerVideo.mp4"
          type="video/mp4"
        />
      </video>
      {/* <div className="absolute inset-0 bg-cover bg-center opacity-20"></div> */}
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight text-white">
          How Ask Worx help your business?
        </h1>
        <div className="flex items-center justify-left space-x-4">
          <div
            className="flex h-5 w-5 items-center justify-center  font-bold text-white"
            style={{ backgroundImage: `url(${'images/services/arrow.png'})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
          >
          </div>
          <h3 className="mt-5 text-lg font-bold text-center text-white">
            Enlarge your organizational coverage by finding authentic project information on our platform.
          </h3>
        </div>
        <div className="flex items-center justify-left space-x-4">
          <div
            className="flex h-5 w-5 items-center justify-center  font-bold text-white"
            style={{ backgroundImage: `url(${'images/services/arrow.png'})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
          >
          </div>
          <h3 className="mt-5 text-lg font-bold text-center text-white">
            We ensure you to deliver the genuine details of all the upcoming projects and bridge you with the opportunities of your interest in no time.
          </h3>
        </div>
        <div className="flex items-center justify-left space-x-4">
          <div
            className="flex h-5 w-5 items-center justify-center  font-bold text-white"
            style={{ backgroundImage: `url(${'images/services/arrow.png'})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
          >
          </div>
          <h3 className="mt-5 text-lg font-bold text-center text-white">
            We make sure our clients connect directly with the heads of projects in the market and forge strong business relationship.
          </h3>
        </div>
        <div className="flex items-center justify-left space-x-4">
          <div
            className="flex h-5 w-5 items-center justify-center  font-bold text-white"
            style={{ backgroundImage: `url(${'images/services/arrow.png'})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
          >
          </div>
          <h3 className="mt-5 text-lg font-bold text-center text-white">
            We serve as the link for our customers to maximize their market hold.
          </h3>
        </div>
        <div className="flex items-center justify-left space-x-4">
          <div
            className="flex h-5 w-5 items-center justify-center  font-bold text-white"
            style={{ backgroundImage: `url(${'images/services/arrow.png'})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
          >
          </div>
          <h3 className="mt-5 text-lg font-bold text-center text-white">
            So, in this technology driven era, expand your venture with just one click through ask worx.
          </h3>
        </div>

        {/* <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90 text-white">
            Enlarge your organizational coverage by finding authentic project information on our platform.
          </p> */}
        <button className="bg-blue-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-blue-700 hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300 shadow-lg">
          Get Started Today
        </button>

        <h3 className="mt-5 text-lg font-bold text-center text-yellow-400">
          We encourage you to ask your customer and ensure your customer with three simple steps
        </h3>
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