// Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../components/AuthContext';
import { Suspense } from 'react';

// Lazy load other components
const StatsCard = React.lazy(() => import('./StatsCard'));
const RecentActivity = React.lazy(() => import('./RecentActivity'));
const WelcomeMessage = React.lazy(() => import('./WelcomeMessage'));

const Dashboard = () => {
  const { isAuthenticated } = useAuth();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (isAuthenticated) {
      // Fetch user data from an API or mock it
      setUserData({
        name: 'John Doe',
        email: 'john.doe@example.com',
      });
    }
  }, [isAuthenticated]);

  return (
    <div className="dashboard-container p-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      {/* Conditionally Rendered Welcome Message */}
      {isAuthenticated ? (
        <div className="mt-4">
          <Suspense fallback={<div>Loading Welcome Message...</div>}>
            <WelcomeMessage user={userData} />
          </Suspense>
        </div>
      ) : (
        <p className="mt-4">Please log in to view your dashboard.</p>
      )}

      {/* Stats Cards */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <Suspense fallback={<div>Loading Stats...</div>}>
          <StatsCard title="Total Users" value="1,230" />
        </Suspense>
        <Suspense fallback={<div>Loading Stats...</div>}>
          <StatsCard title="Active Users" value="320" />
        </Suspense>
        <Suspense fallback={<div>Loading Stats...</div>}>
          <StatsCard title="Total Sales" value="$12,345" />
        </Suspense>
      </div>

      {/* Recent Activity */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        <Suspense fallback={<div>Loading Recent Activity...</div>}>
          <RecentActivity />
        </Suspense>
      </div>
    </div>
  );
};

export default Dashboard;
