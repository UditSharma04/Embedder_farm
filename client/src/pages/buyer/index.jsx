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

const BuyerDashboard = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const [metrics, setMetrics] = useState(null);

  useEffect(() => {
    // Simulate API call with dummy data
    setTimeout(() => {
      setMetrics(dummyData.buyerMetrics);
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
        <p className="text-gray-600">Browse products and manage your orders</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white text-sm">Active Orders</p>
              <h3 className="text-white text-3xl font-bold mt-2">{metrics.activeOrders}</h3>
            </div>
            <div className="bg-blue-400 rounded-full p-3">
              <ShoppingCartIcon className="h-8 w-8 text-white" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-white text-sm">
            <TrendingUpIcon className="h-4 w-4 mr-1" />
            <span>12% more than last month</span>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white text-sm">Completed Orders</p>
              <h3 className="text-white text-3xl font-bold mt-2">{metrics.completedOrders}</h3>
            </div>
            <div className="bg-green-400 rounded-full p-3">
              <CheckCircleIcon className="h-8 w-8 text-white" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-white text-sm">
            <TrendingUpIcon className="h-4 w-4 mr-1" />
            <span>8% increase in completion rate</span>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white text-sm">Total Spent</p>
              <h3 className="text-white text-3xl font-bold mt-2">₹{metrics.totalSpent.toLocaleString()}</h3>
            </div>
            <div className="bg-purple-400 rounded-full p-3">
              <CurrencyRupeeIcon className="h-8 w-8 text-white" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-white text-sm">
            <TrendingUpIcon className="h-4 w-4 mr-1" />
            <span>15% more than last month</span>
          </div>
        </div>
      </div>

      {/* Monthly Spending Chart */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Monthly Spending</h2>
          <div className="flex items-center space-x-2">
            <span className="px-3 py-1 text-sm text-green-600 bg-green-100 rounded-full">
              +12.5% vs last month
            </span>
          </div>
        </div>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={metrics.monthlySpending}>
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

      {/* Top Purchases and Recent Orders */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Purchases */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Top Purchases</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={metrics.topPurchases}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip 
                  formatter={(value) => [`₹${value}`, 'Amount']}
                  contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb' }}
                />
                <Bar dataKey="spent" fill="#2E7D32" />
              </BarChart>
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
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {metrics.recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{order.product}</td>
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
    </div>
  );
};

export default BuyerDashboard; 