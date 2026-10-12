import React, { useEffect, useState } from 'react';
import API from '../services/api';

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    API.get('/admin/stats').then((res) => setStats(res.data));
  }, []);

  if (!stats) return <div className="p-12 text-center">Loading Admin Controls...</div>;

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-black mb-8">System Admin Dashboard</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl border shadow-sm">
          <p className="text-sm font-medium text-slate-500">Total Users</p>
          <h2 className="text-3xl font-bold mt-2 text-primary-600">{stats.total_users}</h2>
        </div>
        <div className="bg-white p-6 rounded-xl border shadow-sm">
          <p className="text-sm font-medium text-slate-500">Total Posts</p>
          <h2 className="text-3xl font-bold mt-2 text-accent-600">{stats.total_posts}</h2>
        </div>
        <div className="bg-white p-6 rounded-xl border shadow-sm">
          <p className="text-sm font-medium text-slate-500">Total Comments</p>
          <h2 className="text-3xl font-bold mt-2 text-slate-800">{stats.total_comments}</h2>
        </div>
        <div className="bg-white p-6 rounded-xl border shadow-sm">
          <p className="text-sm font-medium text-slate-500">Categories</p>
          <h2 className="text-3xl font-bold mt-2 text-slate-800">{stats.total_categories}</h2>
        </div>
      </div>
    </div>
  );
}
