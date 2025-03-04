import React, { useState, useEffect } from 'react';
import dummyData from '../../../dummyData.json';

const BuyerTransactions = () => {
  const [transactions, setTransactions] = useState(null);
  const [expandedRow, setExpandedRow] = useState(null);

  useEffect(() => {
    // Simulate API call with dummy data
    setTimeout(() => {
      setTransactions(dummyData.buyerMetrics.recentOrders);
    }, 1000);
  }, []);

  const toggleRow = (id) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  if (!transactions) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-900">Transactions</h1>
      <p className="mt-2 text-gray-600">View your transaction history</p>

      <div className="mt-6 overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {transactions.map((transaction) => (
              <React.Fragment key={transaction.id}>
                <tr className="hover:bg-gray-50 cursor-pointer" onClick={() => toggleRow(transaction.id)}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{transaction.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{transaction.product}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">₹{transaction.amount.toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                      transaction.status === 'Delivered' 
                        ? 'bg-green-100 text-green-800' 
                        : transaction.status === 'In Transit'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}>{transaction.status}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{transaction.date}</td>
                </tr>
                {expandedRow === transaction.id && (
                  <tr className="bg-gray-100">
                    <td colSpan="5" className="px-6 py-4">
                      <div>
                        <p><strong>Farmer Name:</strong> {transaction.seller}</p>
                        <p><strong>Contact No:</strong> 123-456-7890</p>
                        <p><strong>Stubble Type:</strong> {transaction.product}</p>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BuyerTransactions; 