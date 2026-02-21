import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from '../components/ProtectedRoute';
import AdminLayout from '../components/admin/AdminLayout';
import AdminOverview from './admin/AdminOverview';
import Users from './admin/Users';
import CreateUser from './admin/CreateUser';
import Subscriptions from './admin/Subscriptions';
import Projects from './admin/Projects';
import AdminSettings from './admin/AdminSettings';

const AdminDashboard = () => {
  return (
    <ProtectedRoute adminOnly={true}>
      <AdminLayout>
        <Routes>
          <Route path="/" element={<AdminOverview />} />
          <Route path="/users" element={<Users />} />
          <Route path="/create-user" element={<CreateUser />} />
          <Route path="/subscriptions" element={<Subscriptions />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/settings" element={<AdminSettings />} />
          <Route path="/reports" element={<div className="p-6"><h2 className="text-2xl font-bold">Reports</h2><p className="text-gray-600 mt-2">Reports feature coming soon...</p></div>} />
        </Routes>
      </AdminLayout>
    </ProtectedRoute>
  );
};

export default AdminDashboard;