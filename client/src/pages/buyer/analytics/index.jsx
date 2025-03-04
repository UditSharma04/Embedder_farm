import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { PieChart, Pie, Cell } from 'recharts';
import dummyData from '../../../dummyData.json';
import { CSVLink } from 'react-csv';

const BuyerAnalytics = () => {
  const [analyticsData, setAnalyticsData] = useState(null);

  useEffect(() => {
    // Simulate API call with dummy data
    setTimeout(() => {
      setAnalyticsData(dummyData.buyerMetrics);
    }, 1000);
  }, []);

  if (!analyticsData) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Prepare data for pie chart
  const pieData = analyticsData.topPurchases.map(item => ({ name: item.name, value: item.spent }));

  // CSV data for download
  const csvData = analyticsData.topPurchases.map(item => ({ Stubble: item.name, Quantity: item.quantity, Spent: item.spent }));

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
      <p className="mt-2 text-gray-600">View your buying analytics and statistics</p>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Total Spent</h2>
          <p className="text-3xl font-bold text-gray-800">₹{analyticsData.totalSpent.toLocaleString()}</p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Average Order Value</h2>
          <p className="text-3xl font-bold text-gray-800">₹{(analyticsData.totalSpent / analyticsData.completedOrders).toLocaleString()}</p>
        </div>
      </div>

      <div className="mt-6 bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Monthly Spending Trend</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={analyticsData.monthlySpending}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip formatter={(value) => [`₹${value}`, 'Amount']} />
            <Bar dataKey="amount" fill="#2E7D32" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-6 bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Stubble Purchase Distribution</h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} fill="#8884d8" label>
              {pieData.map((entry, index) => <Cell key={`cell-${index}`} fill={index % 3 === 0 ? '#FF6384' : index % 3 === 1 ? '#36A2EB' : '#FFCE56'} />)}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-6">
        <CSVLink data={csvData} filename="buyer_report.csv" className="btn-primary">
          Download Report
        </CSVLink>
      </div>
    </div>
  );
};

export default BuyerAnalytics; 