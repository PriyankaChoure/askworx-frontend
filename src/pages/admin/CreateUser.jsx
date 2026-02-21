import React, { useState, useEffect } from 'react';
import { getSubscriptionPlans, createUser, getStates, getSectors } from '../../services/adminService';
import { PLAN_TYPES } from '../../utils/constants';

const CreateUser = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'user',
    subscriptionPlan: '',
    isPanIndia: false,
    allowedStates: [],
    allowedSectors: [],
  });
  const [generatedCredentials, setGeneratedCredentials] = useState(null);
  const [subscriptionPlans, setSubscriptionPlans] = useState([]);
  const [states, setStates] = useState([]);
  const [sectors, setSectors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {
    fetchSubscriptionPlans();
    fetchStatesAndSectors();
  }, []);

  const fetchSubscriptionPlans = async () => {
    try {
      const plans = await getSubscriptionPlans();
      setSubscriptionPlans(plans);
    } catch (err) {
      console.error('Failed to fetch subscription plans:', err);
    }
  };

  const fetchStatesAndSectors = async () => {
    try {
      const statesResponse = await getStates(true); // Get active states only
      const sectorsResponse = await getSectors(true); // Get active sectors only
      console.log('statesResponse- ', statesResponse);
      setStates(statesResponse.data || []);
      setSectors(sectorsResponse.data || []);
    } catch (err) {
      console.error('Failed to fetch states and sectors:', err);
      setError('Failed to load states and sectors');
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setValidationErrors(prev => ({ ...prev, [name]: '' })); // Clear error on change
    
    if (type === 'checkbox') {
      if (name === 'isPanIndia') {
        setFormData(prev => ({
          ...prev,
          isPanIndia: checked,
          // Clear states when switching to Pan India
          allowedStates: checked ? [] : prev.allowedStates
        }));
      } else if (name === 'allowedStates') {
        const newStates = checked
          ? [...formData.allowedStates, value]
          : formData.allowedStates.filter(s => s !== value);
        setFormData(prev => ({ ...prev, allowedStates: newStates }));
      } else if (name === 'allowedSectors') {
        const newSectors = checked
          ? [...formData.allowedSectors, value]
          : formData.allowedSectors.filter(s => s !== value);
        setFormData(prev => ({ ...prev, allowedSectors: newSectors }));
      }
    } else {
      // For subscription plan selection, reset state selection logic
      if (name === 'subscriptionPlan') {
        const selectedPlan = subscriptionPlans.find(p => p._id === value);
        const isPanIndia = selectedPlan?.planType === PLAN_TYPES.PLAN_3;
        setFormData(prev => ({
          ...prev,
          [name]: value,
          isPanIndia,
          allowedStates: isPanIndia ? [] : prev.allowedStates
        }));
      } else {
        setFormData(prev => ({ ...prev, [name]: value }));
      }
    }
  };

  const generateUsername = (name) => {
    // Simple username generation: lowercase name with random number
    const baseName = name.toLowerCase().replace(/\s+/g, '');
    const randomNum = Math.floor(Math.random() * 1000);
    return `${baseName}${randomNum}`;
  };

  const generatePassword = () => {
    // Generate a random 8-character password
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const allChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
    let password = '';
     password += uppercase.charAt(
    Math.floor(Math.random() * uppercase.length)
  );
    for (let i = 1; i < 8; i++) {
      password += allChars.charAt(Math.floor(Math.random() * allChars.length));
    }
    return password;
  };

  const validateForm = () => {
    const errors = {};
    
    if (!formData.name.trim()) errors.name = 'Full name is required';
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }
    if (!formData.subscriptionPlan) errors.subscriptionPlan = 'Subscription plan is required';
    
    // Validate states if not Pan India
    if (!formData.isPanIndia && formData.allowedStates.length === 0) {
      errors.allowedStates = 'Please select at least one state';
    }
    
    // Validate sectors
    if (formData.allowedSectors.length === 0) {
      errors.allowedSectors = 'Please select at least one sector';
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      setError('Please fix the errors below');
      return;
    }
    
    setLoading(true);
    setError(null);

    try {
      // Generate credentials
      const username = generateUsername(formData.name);
      const password = generatePassword();

      const userData = {
        name: formData.name,
        email: formData.email,
        role: formData.role,
        username,
        password,
        subscriptionPlan: formData.subscriptionPlan,
        allowedStates: formData.allowedStates,
        allowedSectors: formData.allowedSectors,
        isPanIndia: formData.isPanIndia,
      };

      const response = await createUser(userData);

      // Show generated credentials
      setGeneratedCredentials({
        username,
        password,
        userId: response.user._id,
      });

      // Reset form
      setFormData({
        name: '',
        email: '',
        role: 'user',
        subscriptionPlan: '',
        isPanIndia: false,
        allowedStates: [],
        allowedSectors: [],
      });
      setValidationErrors({});

    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create user');
      console.error('Create user error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Create New User</h2>
        <p className="text-gray-600">Generate credentials and assign subscription plans to new users.</p>
      </div>

      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 rounded-md p-4">
          <p className="text-red-800">{error}</p>
        </div>
      )}

      {generatedCredentials && (
        <div className="mb-6 bg-green-50 border border-green-200 rounded-md p-4">
          <h3 className="text-lg font-semibold text-green-800 mb-2">User Created Successfully!</h3>
          <div className="space-y-2 text-green-700">
            <p><strong>Username:</strong> {generatedCredentials.username}</p>
            <p><strong>Password:</strong> {generatedCredentials.password}</p>
            <p className="text-sm text-green-600 mt-2">
              Please save these credentials. They will not be shown again.
            </p>
          </div>
          <button
            onClick={() => setGeneratedCredentials(null)}
            className="mt-4 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            Create Another User
          </button>
        </div>
      )}

      <div className="bg-white shadow-sm rounded-lg border border-gray-200 p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Full Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                validationErrors.name ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter user's full name"
            />
            {validationErrors.name && (
              <p className="mt-1 text-sm text-red-600">{validationErrors.name}</p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                validationErrors.email ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="Enter email address"
            />
            {validationErrors.email && (
              <p className="mt-1 text-sm text-red-600">{validationErrors.email}</p>
            )}
          </div>

          <div>
            <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-2">
              Role
            </label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <div>
            <label htmlFor="subscriptionPlan" className="block text-sm font-medium text-gray-700 mb-2">
              Subscription Plan *
            </label>
            <select
              id="subscriptionPlan"
              name="subscriptionPlan"
              value={formData.subscriptionPlan}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                validationErrors.subscriptionPlan ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              <option value="">Select a plan</option>
              {subscriptionPlans.map((plan) => (
                <option key={plan._id} value={plan._id}>
                  {plan.name} - {plan.duration} months ({plan.price} INR)
                </option>
              ))}
            </select>
            {validationErrors.subscriptionPlan && (
              <p className="mt-1 text-sm text-red-600">{validationErrors.subscriptionPlan}</p>
            )}
          </div>

          {/* Pan India Checkbox */}
          {formData.subscriptionPlan && formData.isPanIndia && (
            <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    type="checkbox"
                    id="isPanIndia"
                    name="isPanIndia"
                    checked={formData.isPanIndia}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="isPanIndia" className="font-medium text-blue-900">
                    Pan India Access
                  </label>
                  <p className="text-blue-700">This plan includes access to all states and sectors</p>
                </div>
              </div>
            </div>
          )}

          {/* States Section - Hidden for Pan India */}
          {formData.subscriptionPlan && !formData.isPanIndia && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Allowed States *
              </label>
              <div className={`border rounded-md p-3 max-h-48 overflow-y-auto ${
                validationErrors.allowedStates ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-white'
              }`}>
                {states.length > 0 ? (
                  states.map(state => (
                    <label key={state._id} className="flex items-center mb-2 cursor-pointer">
                      <input
                        type="checkbox"
                        name="allowedStates"
                        value={state._id}
                        checked={formData.allowedStates.includes(state._id)}
                        onChange={handleInputChange}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">
                        {state.name} ({state.code})
                      </span>
                    </label>
                  ))
                ) : (
                  <p className="text-gray-500 text-sm">Loading states...</p>
                )}
              </div>
              {validationErrors.allowedStates && (
                <p className="mt-1 text-sm text-red-600">{validationErrors.allowedStates}</p>
              )}
              {formData.allowedStates.length > 0 && (
                <p className="mt-2 text-sm text-gray-600">
                  {formData.allowedStates.length} state(s) selected
                </p>
              )}
            </div>
          )}

          {/* Sectors Section */}
          {formData.subscriptionPlan && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Allowed Sectors *
              </label>
              <div className={`border rounded-md p-3 max-h-48 overflow-y-auto ${
                validationErrors.allowedSectors ? 'border-red-500 bg-red-50' : 'border-gray-300 bg-white'
              }`}>
                {sectors.length > 0 ? (
                  sectors.map(sector => (
                    <label key={sector._id} className="flex items-center mb-2 cursor-pointer">
                      <input
                        type="checkbox"
                        name="allowedSectors"
                        value={sector._id}
                        checked={formData.allowedSectors.includes(sector._id)}
                        onChange={handleInputChange}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">{sector.name}</span>
                    </label>
                  ))
                ) : (
                  <p className="text-gray-500 text-sm">Loading sectors...</p>
                )}
              </div>
              {validationErrors.allowedSectors && (
                <p className="mt-1 text-sm text-red-600">{validationErrors.allowedSectors}</p>
              )}
              {formData.allowedSectors.length > 0 && (
                <p className="mt-2 text-sm text-gray-600">
                  {formData.allowedSectors.length} sector(s) selected
                </p>
              )}
            </div>
          )}

          <div className="pt-4">
            <button
              type="submit"
              disabled={loading || !formData.subscriptionPlan}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Creating User...' : 'Create User & Generate Credentials'}
            </button>
          </div>
        </form>
      </div>

      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-md p-4">
        <h4 className="text-sm font-semibold text-blue-800 mb-2">Important Notes:</h4>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• Username and password will be auto-generated</li>
          <li>• Credentials will be displayed only once after creation</li>
          <li>• For Pan India plans: States field is automatically disabled</li>
          <li>• For region-specific plans: Select at least one state and one sector</li>
          <li>• Make sure to save the credentials securely</li>
          <li>• User will be able to change password after first login</li>
        </ul>
      </div>
    </div>
  );
};

export default CreateUser;