import React, { useState, useEffect } from 'react';
import { getSubscriptionPlans } from '../../services/adminService';

const Subscriptions = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSubscriptionPlans();
  }, []);

  const fetchSubscriptionPlans = async () => {
    try {
      setLoading(true);
      const plans = await getSubscriptionPlans();
      setPlans(plans);
    } catch (err) {
      setError('Failed to fetch subscription plans');
      console.error('Subscription plans fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

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
            onClick={fetchSubscriptionPlans}
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
        <h2 className="text-2xl font-bold text-gray-900">Subscription Plans</h2>
        <p className="text-gray-600">Manage and view all available subscription plans.</p>
      </div>

      <div className="mb-6 flex justify-between items-center">
        <div className="text-sm text-gray-600">
          Total Plans: {plans.length}
        </div>
        <button
          onClick={fetchSubscriptionPlans}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Refresh
        </button>
      </div>

      {plans.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
          <div className="text-gray-400 text-6xl mb-4">📋</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Subscription Plans</h3>
          <p className="text-gray-600">No subscription plans have been created yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div key={plan._id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">{plan.name}</h3>
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                  plan.status === 'active'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {plan.status}
                </span>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Plan Type:</span>
                  <span className="text-sm font-medium text-gray-900">{plan.planType}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Duration:</span>
                  <span className="text-sm font-medium text-gray-900">{plan.duration} months</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Price:</span>
                  <span className="text-lg font-bold text-blue-600">₹{plan.price}</span>
                </div>
              </div>

              <div className="flex space-x-2">
                <button
                  className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  onClick={() => {/* Handle edit */}}
                >
                  Edit
                </button>
                <button
                  className={`flex-1 py-2 px-4 rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                    plan.status === 'active'
                      ? 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500'
                      : 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500'
                  }`}
                  onClick={() => {/* Handle status change */}}
                >
                  {plan.status === 'active' ? 'Disable' : 'Enable'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Plan Button */}
      <div className="mt-8 text-center">
        <button className="bg-green-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
          + Add New Plan
        </button>
      </div>
    </div>
  );
};

export default Subscriptions;