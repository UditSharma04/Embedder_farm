import React, { useState } from 'react';

const StockInformation = () => {
  const [stock, setStock] = useState({
    wheatStubble: 0,
    riceStubble: 0,
    bajraStubble: 0,
    barleyStubble: 0,
  });

  const handleChange = (e) => {
    setStock({ ...stock, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic to save stock information
    console.log('Stock information submitted:', stock);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-900">Stock Information</h1>
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Wheat Stubble (kg)</label>
            <input
              type="number"
              name="wheatStubble"
              value={stock.wheatStubble}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Rice Stubble (kg)</label>
            <input
              type="number"
              name="riceStubble"
              value={stock.riceStubble}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Bajra Stubble (kg)</label>
            <input
              type="number"
              name="bajraStubble"
              value={stock.bajraStubble}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Barley Stubble (kg)</label>
            <input
              type="number"
              name="barleyStubble"
              value={stock.barleyStubble}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              required
            />
          </div>
        </div>
        <div className="flex justify-end mt-4">
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            Save Stock
          </button>
        </div>
      </form>
    </div>
  );
};

export default StockInformation; 