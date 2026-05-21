import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getUserSubscription, getUserProjects, exportProjectsToExcel } from '../services/authService';
import SubscriptionModal from '../components/SubscriptionModal';
import SubscriptionBadge from '../components/SubscriptionBadge';
import SubscriptionWarningBanner from '../components/SubscriptionWarningBanner';
import ProjectTable from '../components/ProjectTable';

const normalizeDate = (dateInput) => {
  if (!dateInput) return null;
  // Accept Date object or ISO string.
  const d = new Date(dateInput);
  if (!isNaN(d.getTime())) return d;

  if (typeof dateInput === 'string') {
    // Handle date-only strings like YYYY-MM-DD to avoid timezone shift.
    const match = dateInput.match(/^(\d{4}-\d{2}-\d{2})$/);
    if (match) {
      return new Date(`${match[1]}T00:00:00.000Z`);
    }
  }

  return null;
};

const formatDate = (dateInput) => {
  const d = normalizeDate(dateInput);
  return d ? d.toLocaleDateString() : 'N/A';
};

const calculateSubscriptionStatus = (startDateInput, endDateInput) => {
  const startDate = normalizeDate(startDateInput);
  const endDate = normalizeDate(endDateInput);

  if (!startDate || !endDate || endDate < startDate) {
    return {
      totalMonths: 0,
      remainingMonths: 0,
      remainingDays: 0,
      isExpiringSoon: false,
      isExpired: false,
      statusMessage: 'Invalid subscription dates',
    };
  }

  const totalMonths = Math.max(
    0,
    (endDate.getFullYear() - startDate.getFullYear()) * 12 + (endDate.getMonth() - startDate.getMonth()) + (endDate.getDate() >= startDate.getDate() ? 1 : 0)
  );

  const today = new Date();
  const todayUTC = new Date(Date.UTC(today.getFullYear(), today.getMonth(), today.getDate()));
  const endUTC = new Date(Date.UTC(endDate.getFullYear(), endDate.getMonth(), endDate.getDate()));

  const isExpired = todayUTC > endUTC;

  let remainingMonths = 0;
  let remainingDays = 0;

  if (!isExpired) {
    remainingMonths = (endUTC.getFullYear() - todayUTC.getFullYear()) * 12 + (endUTC.getMonth() - todayUTC.getMonth());
    if (endUTC.getDate() < todayUTC.getDate()) remainingMonths -= 1;
    remainingMonths = Math.max(0, remainingMonths);

    const futureDate = new Date(Date.UTC(todayUTC.getFullYear(), todayUTC.getMonth(), todayUTC.getDate()));
    futureDate.setUTCMonth(futureDate.getUTCMonth() + remainingMonths);

    const msPerDay = 1000 * 60 * 60 * 24;
    remainingDays = Math.ceil((endUTC - futureDate) / msPerDay);
    remainingDays = Math.max(0, remainingDays);

    if (remainingMonths === 0 && remainingDays > 0) {
      // if less than one month remains, remainingDays may reflect this partial month.
      remainingMonths = 0;
    }
  }

  const isExpiringSoon = !isExpired && remainingMonths <= 1;

  const statusMessage = isExpired
    ? 'Your subscription has expired.'
    : isExpiringSoon
    ? 'Your subscription will expire soon. Please renew.'
    : 'Subscription active';

  return {
    totalMonths,
    remainingMonths,
    remainingDays,
    isExpiringSoon,
    isExpired,
    statusMessage,
  };
};

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const [subscription, setSubscription] = useState(null);
  const isFreeUser = user?.isFreeSubscriber;
  const [projects, setProjects] = useState([]);
  const [groupedProjects, setGroupedProjects] = useState({});
  // const [availableFilters, setAvailableFilters] = useState({});
  const [isSubscriptionModalOpen, setIsSubscriptionModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [projectsLoading, setProjectsLoading] = useState(false);
  const [exporting, setExporting] = useState(false);
  // const [currentFilters, setCurrentFilters] = useState({ months: [], sectors: [] });
  const [filters, setFilters] = useState({
  states: [],
  sectors: [],
  dateFilter: {
    type: 'LAST_7_DAYS', // or 'MONTHS'
    months: []
  }
});


  // Fetch subscription on mount
  useEffect(() => {
    if (user)
      fetchSubscription(user);

  }, [user]);

  // Fetch projects when filters change
  useEffect(() => {
    if (!subscription) {
      return;
    }

    setFilters({
      states: subscription.allowedStates?.map(state => state.name) || [],
      sectors: subscription.allowedSectors?.map(sector => sector.name) || [],
      dateFilter: {
        type: 'Last_7_Days',
        months: [],
      }
    });
    // fetchProjects();

  }, [subscription]);

  useEffect(() => {
  if (!subscription) return;
  fetchProjects();
}, [filters]);


  const fetchSubscription = async (user) => {
    try {
      setLoading(true);
      const sub = await getUserSubscription(user);

      console.log('Subscription API data:', sub);

      const start = sub.startDate || sub.fromDate;
      const end = sub.endDate || sub.toDate;
      const calculated = calculateSubscriptionStatus(start, end);

      const normalizedSubscription = {
        ...sub,
        startDate: start,
        endDate: end,
        ...calculated,
        isExpiring: calculated.isExpiringSoon,
        isExpired: calculated.isExpired,
        remainingTimeDisplay: calculated.isExpired
          ? 'Expired'
          : calculated.isExpiringSoon
          ? `${calculated.remainingDays} day${calculated.remainingDays !== 1 ? 's' : ''} remaining`
          : `${calculated.remainingMonths} month${calculated.remainingMonths !== 1 ? 's' : ''} remaining`,
      };

      setSubscription(normalizedSubscription);

      // Show warning modal on first load if expiring soon
      if (normalizedSubscription.isExpiring && !localStorage.getItem('subscription-expiring-warned')) {
        setIsSubscriptionModalOpen(true);
        localStorage.setItem('subscription-expiring-warned', 'true');
      }
      // if the server indicates trial/free status in subscription object use that too
      if (normalizedSubscription.isFreeSubscriber || normalizedSubscription.isTrial) {
        // track locally if needed for UI
      }
    } catch (err) {
      console.error('Failed to fetch subscription:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchProjects = async () => {
    try {
      setProjectsLoading(true);
      const data = await getUserProjects(filters);
      setProjects(data.projects || []);
      setGroupedProjects(data.groupedProjects || {});
      // setAvailableFilters(data.availableFilters || {});
    } catch (err) {
      console.error('Failed to fetch projects:', err);
    } finally {
      setProjectsLoading(false);
    }
  };

  // const handleFilterChange = (filters) => {
  //   setCurrentFilters(filters);
  // };

  const handleExportExcel = async () => {
    try {
      setExporting(true);
      const blob = await exportProjectsToExcel(filters);
      
      // Create download link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `projects_export_${new Date().toISOString().split('T')[0]}.xlsx`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Failed to export Excel:', err);
      alert('Failed to export Excel file');
    } finally {
      setExporting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Subscription Warning Banner */}
      {subscription && (subscription.isExpiring || subscription.isExpired) && (
        <SubscriptionWarningBanner subscription={subscription} isDismissible={!subscription.isExpired} />
      )}

      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-gray-600 mt-1">Welcome, {user?.username}</p>
            </div>
            <div className="flex items-center gap-4">
              {subscription && <SubscriptionBadge subscription={subscription} />}
              <button
                onClick={() => setIsSubscriptionModalOpen(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition"
              >
                View Subscription
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Subscription Status Card */}
        {/* {subscription && (
          <div className="mb-8 bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Subscription Status</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-sm text-gray-600">Plan</p>
                <p className="text-lg font-semibold text-gray-900">{subscription.planName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Status</p>
                <p className={`text-lg font-semibold ${
                  subscription.isExpired
                    ? 'text-red-600'
                    : subscription.isExpiring
                    ? 'text-yellow-600'
                    : 'text-green-600'
                }`}>
                  {subscription.isExpired ? 'Expired' : subscription.isExpiring ? 'Expiring' : 'Active'}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Remaining</p>
                <p className="text-lg font-semibold text-gray-900">
                  {subscription.remainingTimeDisplay}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Access Type</p>
                <p className="text-lg font-semibold text-gray-900">
                  {subscription.isPanIndia ? 'Pan India' : `${subscription.allowedStates?.length || 0} States`}
                </p>
              </div>
            </div>
          </div>
        )} */}

        {/* Projects Section */}
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Projects Data</h2>
            <button
              onClick={handleExportExcel}
              disabled={exporting || projects.length === 0 || isFreeUser || subscription?.isTrial}
              className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium py-2 px-4 rounded transition flex items-center gap-2"
            >
              {exporting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Exporting...
                </>
              ) : (
                <>
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 16v-4m0 0V8m0 4H8m0 0v4m0-4H4m4-4h12a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2z" />
                  </svg>
                  Download Excel
                </>
              )}
            </button>
          </div>

          {/* trial users cannot download message */}
          {(isFreeUser || subscription?.isTrial) && (
            <div className="mt-2 text-sm text-red-600">
              Trial/free subscribers can view data but downloads are disabled.
            </div>
          )}

          <ProjectTable
            projects={projects}
            groupedProjects={groupedProjects}
            allowedStates={subscription?.allowedStates?.map(state => state.name) || []}
            allowedSectors={subscription?.allowedSectors?.map(sector => sector.name) || []}
            filters={filters}
            onFilterChange={setFilters}
            isLoading={projectsLoading}
          />

        </div>

        {/* Read-only Notice */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-800">
            <strong>Note:</strong> This dashboard is read-only. All data is filtered based on your subscription plan. 
            You can view, filter, and download data only. No modifications are allowed.
          </p>
        </div>
      </main>

      {/* Subscription Modal */}
      <SubscriptionModal
        subscription={subscription}
        isOpen={isSubscriptionModalOpen}
        onClose={() => setIsSubscriptionModalOpen(false)}
      />
    </div>
  );
};

export default Dashboard;