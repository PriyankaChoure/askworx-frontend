import React from 'react';

const SubscriptionModal = ({ subscription, isOpen, onClose }) => {
  if (!isOpen || !subscription) return null;

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-96 overflow-y-auto">
          {/* Header */}
          <div className="sticky top-0 bg-blue-600 text-white px-6 py-4 flex justify-between items-center">
            <h2 className="text-xl font-bold">Subscription Details</h2>
            <button
              onClick={onClose}
              className="text-white hover:bg-blue-700 rounded-full p-1 transition"
            >
              ✕
            </button>
          </div>

          {/* Content */}
          <div className="px-6 py-6">
            {/* Plan Info */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-600 mb-2">PLAN</h3>
              <p className="text-2xl font-bold text-gray-900">{subscription.planName}</p>
              <p className="text-sm text-gray-500 mt-1">Type: {subscription.planType}</p>
            </div>

            {/* Dates */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-600 mb-3">SUBSCRIPTION PERIOD</h3>
              <div className="space-y-2">
                <div>
                  <p className="text-xs text-gray-500">Start Date</p>
                  <p className="text-sm font-medium text-gray-900">
                    {formatDate(subscription.startDate)}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">End Date</p>
                  <p className="text-sm font-medium text-gray-900">
                    {formatDate(subscription.endDate)}
                  </p>
                </div>
              </div>
            </div>

            {/* States Access */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-600 mb-2">ALLOWED STATES</h3>
              {subscription.isPanIndia ? (
                <p className="text-sm font-medium text-green-600">Pan India Access</p>
              ) : subscription.allowedStates && subscription.allowedStates.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {subscription.allowedStates.map((state) => (
                    <span
                      key={state.code}
                      className="inline-block bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full"
                    >
                      {state.name}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500">No state access</p>
              )}
            </div>

            {/* Sectors Access */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-600 mb-2">ALLOWED SECTORS</h3>
              {subscription.allowedSectors && subscription.allowedSectors.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {subscription.allowedSectors.map((sector) => (
                    <span
                      key={sector.name}
                      className="inline-block bg-purple-100 text-purple-800 text-xs px-3 py-1 rounded-full"
                    >
                      {sector.name}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500">No sector access</p>
              )}
            </div>

            {/* Expiry Status */}
            <div className="pt-6 border-t border-gray-200">
              <div className={`p-4 rounded-lg ${
                subscription.isExpired
                  ? 'bg-red-50 border border-red-200'
                  : subscription.isExpiring
                  ? 'bg-yellow-50 border border-yellow-200'
                  : 'bg-green-50 border border-green-200'
              }`}>
                <p className={`text-sm font-semibold ${
                  subscription.isExpired
                    ? 'text-red-800'
                    : subscription.isExpiring
                    ? 'text-yellow-800'
                    : 'text-green-800'
                }`}>
                  {subscription.isExpired
                    ? 'Subscription Expired'
                    : subscription.isExpiring
                    ? 'Subscription Expiring Soon'
                    : 'Subscription Active'}
                </p>
                <p className={`text-xs mt-1 ${
                  subscription.isExpired
                    ? 'text-red-700'
                    : subscription.isExpiring
                    ? 'text-yellow-700'
                    : 'text-green-700'
                }`}>
                  {subscription.remainingTimeDisplay}
                </p>
              </div>
            </div>
          </div>

          {/* Close Button */}
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
            <button
              onClick={onClose}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SubscriptionModal;
