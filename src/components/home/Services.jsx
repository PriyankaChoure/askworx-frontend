import React from 'react';

const Services = () => {
  const pillars = [
    {
      title: 'Sales Funnel',
      description: 'The core concepts which can take your business from the unknown to a multi-dimensional marketing machine. We provide you with hundreds of customer list which will help you find prospects and will assure you customers and better relations.',
      icon: '📈'
    },
    {
      title: 'Network',
      description: 'The strong network will enable you multiple project data. It will help you enhance your BRAND VALUE which in return will increase your market share.',
      icon: '🌐'
    },
    {
      title: 'Strategy',
      description: 'We will facilitate you with a focused strategy to aid you and your marketing and sales team. The strategy will avail you definite customers and strong future relations. And will assist you quantify your profit with minimum investment.',
      icon: '🎯'
    },
    {
      title: 'Data',
      description: 'The data is the new gold for the technological era and no great marketing decision has ever been made without qualitative data. In this digitalized times we will bestow you with data of all the new and upcoming projects which will accelerate your PLANNING and simplify FORECASTING for your business which in turn will BOOST your growth.',
      icon: '📊'
    },
    {
      title: 'Market',
      description: 'The role of market in the growth is most significant. We assure you to deliver market data insights and keep you updated about present market scenario and the future it holds. We analyze market for you to have better knowledge about it.',
      icon: '📈'
    },
    {
      title: 'Competitive Advantage',
      description: 'Competitive advantage is a company\'s ability to perform in one or more ways that competitors cannot or will not match. We provide you an edge over your competitors through early and detailed data and understanding of the projects before everyone.',
      icon: '🏆'
    }
  ];

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            SIX PILLARS OF ASK WORX
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Pillars That Help To Grow Your Business
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pillars.map((pillar, index) => (
            <div key={index} className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
              <div className="text-6xl mb-6 text-center">{pillar.icon}</div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4 text-center">{pillar.title}</h3>
              <p className="text-base text-gray-600 leading-relaxed">{pillar.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;