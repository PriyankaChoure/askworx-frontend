import React from 'react';

const WhyChooseUs = () => {
  const testimonials = [
    {
      name: 'Mr. Darshan Patel',
      title: 'Proprietor | Govt. Contractor',
      text: 'For the past few months I\'ve used your service as tool for starting conversations with new.'
    },
    {
      name: 'Mr. Akul Pandit',
      title: 'Proprietor | Architect',
      text: 'AskWorx is used as a starter conversation, and leads to meetings and extra confidence for the Representatives'
    },
    {
      name: 'Mr. Ashok Gehlod',
      title: 'Director | Steel Manufacturer',
      text: 'AskWorx really helps people to reach their customer in the early stage and helps in building business relationship before reaching the competitor.'
    },
    {
      name: 'Mr. Nirav Patel',
      title: 'Shop Owner | Steel and Pipes',
      text: 'AskWorx makes Sales & Marketing easier & focused'
    },
    {
      name: 'Mr. Harsh Raj',
      title: 'Proprietor | Civil Engineering Co.',
      text: 'One deal from AskWorx makes it worthwhile.'
    },
    {
      name: 'Mr. Vishvesh',
      title: 'Director | Civil Contractor',
      text: 'Businessmen can bring a boost to their business with your service and earn a lot of money.'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            What People Say About Us
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Some of our great clients and their reviews
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-gray-100 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-400 to-purple-500 rounded-bl-full opacity-10"></div>
              <div className="flex mb-6">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <blockquote className="text-gray-700 mb-6 italic leading-relaxed">"{testimonial.text}"</blockquote>
              <div className="border-t pt-4">
                <div className="font-bold text-gray-900 text-lg">{testimonial.name}</div>
                <div className="text-sm text-gray-500">{testimonial.title}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;