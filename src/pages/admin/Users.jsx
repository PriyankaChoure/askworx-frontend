import React, { useState, useEffect } from 'react';
import { getUsers, updateUserStatus, getSubscriptionPlans, assignPlan, getStates, getSectors } from '../../services/adminService';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [plans, setPlans] = useState([]);
  const [states, setStates] = useState([]);
  const [sectors, setSectors] = useState([]);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [assignForm, setAssignForm] = useState({
    planId: '',
    allowedStates: [],
    allowedSectors: [],
    isPanIndia: false
  });

  useEffect(() => {
    fetchUsers();
    fetchPlans();
    fetchStatesAndSectors();
  }, []);

  const fetchPlans = async () => {
    try {
      const plans = await getSubscriptionPlans();
      setPlans(plans);
    } catch (err) {
      console.error('Failed to fetch plans:', err);
    }
  };

  const fetchStatesAndSectors = async () => {
    try {
      const statesResponse = await getStates(true); // Get active states only
      const sectorsResponse = await getSectors(true); // Get active sectors only
      setStates(statesResponse.data || []);
      setSectors(sectorsResponse.data || []);
    } catch (err) {
      console.error('Failed to fetch states and sectors:', err);
    }
  };

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const users = await getUsers();
      setUsers(users);
    } catch (err) {
      setError('Failed to fetch users');
      console.error('Users fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAssignPlan = (user) => {
    setSelectedUser(user);
    setAssignForm({
      planId: '',
      allowedStates: [],
      allowedSectors: sectors.map(s => s._id),
      isPanIndia: false
    });
    setShowAssignModal(true);
  };

  const handleAssignFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      if (name === 'allowedStates') {
        const newStates = checked
          ? [...assignForm.allowedStates, value]
          : assignForm.allowedStates.filter(s => s !== value);
        setAssignForm(prev => ({ ...prev, allowedStates: newStates }));
      } else if (name === 'isPanIndia') {
        setAssignForm(prev => ({ ...prev, isPanIndia: checked, allowedStates: checked ? [] : prev.allowedStates }));
      }
    } else {
      setAssignForm(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleAssignSubmit = async (e) => {
    e.preventDefault();
    try {
      await assignPlan({
        userId: selectedUser._id,
        planId: assignForm.planId,
        allowedStates: assignForm.allowedStates,
        allowedSectors: assignForm.allowedSectors,
        isPanIndia: assignForm.isPanIndia
      });
      setShowAssignModal(false);
      fetchUsers();
    } catch (err) {
      alert('Failed to assign plan');
      console.error(err);
    }
  };

  const handleUserAction = async (userId, action) => {
    try {
      await updateUserStatus(userId, action);
      // Refresh users list
      fetchUsers();
    } catch (err) {
      console.error(`Failed to ${action} user:`, err);
      alert(`Failed to ${action} user`);
    }
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <p className="text-red-800">{error}</p>
          <button
            onClick={fetchUsers}
            className="mt-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Users Management</h2>
        <p className="text-gray-600">View and manage all registered users.</p>
      </div>

      {/* Search and Actions */}
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div className="relative">
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
        <button
          onClick={fetchUsers}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Refresh
        </button>
      </div>

      {/* Users Table */}
      <div className="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email / Username
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Subscription Plan
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center text-gray-500">
                    {searchTerm ? 'No users found matching your search.' : 'No users found.'}
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr key={user._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{user.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{user.email}</div>
                      <div className="text-sm text-gray-500">{user.username}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        user.role === 'admin'
                          ? 'bg-purple-100 text-purple-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {user.subscriptionPlan || 'No Plan'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        user.status === 'active'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {user.status || 'Active'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      <button
                        onClick={() => {/* Handle view user */}}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        View
                      </button>
                      <button
                        onClick={() => handleAssignPlan(user)}
                        className="text-green-600 hover:text-green-900"
                      >
                        Assign Plan
                      </button>
                      <button
                        onClick={() => handleUserAction(user._id, user.status === 'active' ? 'disable' : 'enable')}
                        className={`${
                          user.status === 'active' ? 'text-red-600 hover:text-red-900' : 'text-green-600 hover:text-green-900'
                        }`}
                      >
                        {user.status === 'active' ? 'Disable' : 'Enable'}
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination placeholder */}
      <div className="mt-6 flex justify-between items-center">
        <div className="text-sm text-gray-700">
          Showing {filteredUsers.length} of {users.length} users
        </div>
        <div className="flex space-x-2">
          <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50 disabled:opacity-50" disabled>
            Previous
          </button>
          <button className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 disabled:opacity-50" disabled>
            Next
          </button>
        </div>
      </div>

      {/* Assign Plan Modal */}
      {showAssignModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Assign Subscription Plan</h3>
              <form onSubmit={handleAssignSubmit}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Plan</label>
                  <select
                    name="planId"
                    value={assignForm.planId}
                    onChange={handleAssignFormChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  >
                    <option value="">Select Plan</option>
                    {plans.map(plan => (
                      <option key={plan._id} value={plan._id}>{plan.name} ({plan.planType})</option>
                    ))}
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <input
                      type="checkbox"
                      name="isPanIndia"
                      checked={assignForm.isPanIndia}
                      onChange={handleAssignFormChange}
                      className="mr-2"
                    />
                    Pan India Access
                  </label>
                </div>
                {!assignForm.isPanIndia && (
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Allowed States</label>
                    <div className="max-h-40 overflow-y-auto border border-gray-300 rounded-md p-2">
                      {states.map(state => (
                        <label key={state._id} className="block">
                          <input
                            type="checkbox"
                            name="allowedStates"
                            value={state._id}
                            checked={assignForm.allowedStates.includes(state._id)}
                            onChange={handleAssignFormChange}
                            className="mr-2"
                          />
                          {state.name} ({state.code})
                        </label>
                      ))}
                    </div>
                  </div>
                )}
                <div className="flex justify-end space-x-2">
                  <button
                    type="button"
                    onClick={() => setShowAssignModal(false)}
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Assign
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;