import { useState, useEffect } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';
import {
  CurrencyRupeeIcon,
  ShoppingCartIcon,
  CheckCircleIcon,
  ClockIcon,
  TrendingUpIcon,
  TrendingDownIcon
} from '@heroicons/react/outline';

import dummyData from '../../dummyData.json';

const FarmerDashboard = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const [metrics, setMetrics] = useState(null);

  useEffect(() => {
    // Simulate API call with dummy data
    setTimeout(() => {
      setMetrics(dummyData.farmerMetrics);
    }, 1000);
  }, []);

  if (!metrics) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="border-b pb-4">
        <h1 className="text-2xl font-bold text-gray-900">Welcome back, {user.fullName}!</h1>
        <p className="text-gray-600">Manage your stubble listings and orders</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white text-sm">Active Listings</p>
              <h3 className="text-white text-3xl font-bold mt-2">{metrics?.activeListings || 0}</h3>
            </div>
            <div className="bg-blue-400 rounded-full p-3">
              <ShoppingCartIcon className="h-8 w-8 text-white" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-white text-sm">
            <TrendingUpIcon className="h-4 w-4 mr-1" />
            <span>10% more than last month</span>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white text-sm">Completed Sales</p>
              <h3 className="text-white text-3xl font-bold mt-2">{metrics?.completedSales || 0}</h3>
            </div>
            <div className="bg-green-400 rounded-full p-3">
              <CheckCircleIcon className="h-8 w-8 text-white" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-white text-sm">
            <TrendingUpIcon className="h-4 w-4 mr-1" />
            <span>15% increase in sales</span>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white text-sm">Total Earnings</p>
              <h3 className="text-white text-3xl font-bold mt-2">₹{(metrics?.totalEarnings || 0).toLocaleString()}</h3>
            </div>
            <div className="bg-purple-400 rounded-full p-3">
              <CurrencyRupeeIcon className="h-8 w-8 text-white" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-white text-sm">
            <TrendingUpIcon className="h-4 w-4 mr-1" />
            <span>20% more than last month</span>
          </div>
        </div>
      </div>

      {/* Monthly Earnings Chart */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Monthly Earnings</h2>
          <div className="flex items-center space-x-2">
            <span className="px-3 py-1 text-sm text-green-600 bg-green-100 rounded-full">
              +20% vs last month
            </span>
          </div>
        </div>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={metrics?.monthlyEarnings || []}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip 
                formatter={(value) => [`₹${value}`, 'Amount']}
                contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb' }}
              />
              <Area 
                type="monotone" 
                dataKey="amount" 
                stroke="#2E7D32" 
                fill="#4CAF50" 
                fillOpacity={0.2} 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Orders</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Buyer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {(metrics?.recentOrders || []).map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.buyer}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">₹{order.amount.toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                      order.status === 'Delivered' 
                        ? 'bg-green-100 text-green-800' 
                        : order.status === 'In Transit'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      <div className="flex items-center">
                        {order.status === 'Delivered' ? (
                          <CheckCircleIcon className="h-4 w-4 mr-1" />
                        ) : order.status === 'In Transit' ? (
                          <ClockIcon className="h-4 w-4 mr-1" />
                        ) : (
                          <ShoppingCartIcon className="h-4 w-4 mr-1" />
                        )}
                        {order.status}
                      </div>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default FarmerDashboard; 