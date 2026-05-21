import React from 'react';

const SubscriptionBadge = ({ subscription }) => {
  if (!subscription) return null;

  if (subscription.isExpired) {
    return (
      <div className="inline-flex items-center px-4 py-2 bg-red-100 border border-red-300 rounded-full">
        <span className="inline-block w-2 h-2 bg-red-600 rounded-full mr-2"></span>
        <span className="text-sm font-semibold text-red-800">Subscription Expired</span>
      </div>
    );
  }

  // show trial badge if applicable
  if (subscription.isTrial) {
    return (
      <div className="inline-flex items-center px-4 py-2 bg-yellow-100 border border-yellow-300 rounded-full">
        <span className="inline-block w-2 h-2 bg-yellow-600 rounded-full mr-2"></span>
        <span className="text-sm font-semibold text-yellow-800">Trial User</span>
      </div>
    );
  }

  if (subscription.isExpiring) {
    return (
      <div className="inline-flex items-center px-4 py-2 bg-red-100 border border-red-300 rounded-full animate-pulse">
        <span className="inline-block w-2 h-2 bg-red-600 rounded-full mr-2"></span>
        <span className="text-sm font-semibold text-red-800">
          {subscription.remainingTimeDisplay}
        </span>
      </div>
    );
  }

  return (
    <div className="inline-flex items-center px-4 py-2 bg-green-100 border border-green-300 rounded-full">
      <span className="inline-block w-2 h-2 bg-green-600 rounded-full mr-2"></span>
      <span className="text-sm font-semibold text-green-800">
        {subscription.remainingTimeDisplay}
      </span>
    </div>
  );
};

export default SubscriptionBadge;
