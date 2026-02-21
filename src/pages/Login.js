import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import SubscriptionWarningBanner from '../components/SubscriptionWarningBanner';

const Login = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [subscriptionWarning, setSubscriptionWarning] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error, subscriptionWarning: reduxSubscriptionWarning } = useSelector((state) => state.auth);

  // Update local state when subscription warning from redux changes
  useEffect(() => {
    if (reduxSubscriptionWarning) {
      setSubscriptionWarning({
        isExpiring: reduxSubscriptionWarning.isExpiring,
        isExpired: reduxSubscriptionWarning.isExpired,
        remainingTimeDisplay: reduxSubscriptionWarning.remainingDays
          ? `${reduxSubscriptionWarning.remainingDays} day${reduxSubscriptionWarning.remainingDays !== 1 ? 's' : ''} remaining`
          : null,
        warningMessage: reduxSubscriptionWarning.message
      });
    }
  }, [reduxSubscriptionWarning]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await dispatch(login(credentials)).unwrap();
      console.log('Login successful:', result);
      
      // Check if there's a subscription warning but still allow login
      if (result.subscriptionWarning) {
        // Store warning info that will be shown in Dashboard
        localStorage.setItem('subscription-warning', JSON.stringify(result.subscriptionWarning));
      }

      // Check user role and redirect accordingly
      if (result.user && result.user.role && result.user.role === 'Super Admin') {
        console.log('Navigating to admin dashboard');
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      console.error('Login failed:', err);
      // Check if force password reset is required
      if (err.forcePasswordReset) {
        // Store userId temporarily for reset page
        sessionStorage.setItem('resetUserId', err.userId);
        navigate('/reset-password');
        return;
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      {/* Show subscription warning if present */}
      {subscriptionWarning && (
        <div className="fixed top-0 left-0 right-0 z-50">
          <SubscriptionWarningBanner
            subscription={subscriptionWarning}
            isDismissible={!subscriptionWarning.isExpired}
          />
        </div>
      )}

      <div className="max-w-md w-full space-y-8 mt-20">
        <div className="text-center">
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-600 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mb-4"
          >
            ← Home
          </button>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <input
                id="username"
                name="username"
                type="text"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Username"
                value={credentials.username}
                onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
              />
            </div>
            <div>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={credentials.password}
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
              />
            </div>
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {isLoading ? 'Signing in...' : 'Sign in'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;