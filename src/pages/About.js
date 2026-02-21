import React from 'react';
import Navbar from '../components/home/Navbar';
import Hero from '../components/home/Hero';
import Services from '../components/home/Services';
import About from '../components/home/About';
import WhyChooseUs from '../components/home/WhyChooseUs';
import CTA from '../components/home/CTA';
import Footer from '../components/home/Footer';
import Aboutus from '../components/home/Aboutus';

const AboutPage = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      {/* <Hero /> */}
      <Aboutus/>
      <Footer />
    </div>
  );
};

export default AboutPage;