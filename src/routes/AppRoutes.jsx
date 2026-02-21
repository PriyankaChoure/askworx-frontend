import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from '../components/ProtectedRoute';
import Home from '../pages/Home';
import Login from '../pages/Login';
import ResetPassword from '../pages/ResetPassword';
import AdminDashboard from '../pages/AdminDashboard';
import Dashboard from '../pages/Dashboard';
import AboutPage from '../pages/About';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/about" element={<AboutPage/>}/>
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