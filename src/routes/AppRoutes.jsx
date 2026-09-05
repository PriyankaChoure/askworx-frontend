import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from '../components/ProtectedRoute';
import Home from '../pages/Home';
import Login from '../pages/Login';
import ResetPassword from '../pages/ResetPassword';
import AdminDashboard from '../pages/AdminDashboard';
import Dashboard from '../pages/Dashboard';
// import AboutPage from '../pages/About';
import About from "../pages/About";
import Services from "../pages/Services";
import Plans from "../pages/Plans";
import Contact from "../pages/Contact";
import Career from "../pages/Career";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      {/* <Route path="/about" element={<AboutPage/>}/> */}
      <Route path="/about" element={<About />} />
      <Route path="/service" element={<Services />} />
      <Route path="/plan" element={<Plans />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/career" element={<Career />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/admin/*" element={<AdminDashboard />} />
      <Route path="/dashboard/*" element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      } />
    </Routes>
  );
};

export default AppRoutes;