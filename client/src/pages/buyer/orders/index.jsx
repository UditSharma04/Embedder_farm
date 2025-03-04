import { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import {
  SearchIcon,
  FilterIcon,
  SortAscendingIcon,
  PhoneIcon,
  ShoppingCartIcon
} from '@heroicons/react/outline';

const BuyerOrders = () => {
  // States for data and filters
  const [products, setProducts] = useState([
    {
      id: 1,
      farmerName: "Rajesh Kumar",
      phone: "+91 9876543210",
      stubbleType: "Wheat Stubble",
      quantity: 500,
      pricePerUnit: 200,
      location: "Punjab",
      available: true
    },
    {
      id: 2,
      farmerName: "Amit Singh",
      phone: "+91 9876543211",
      stubbleType: "Rice Stubble",
      quantity: 300,
      pricePerUnit: 180,
      location: "Haryana",
      available: true
    },
    {
      id: 3,
      farmerName: "Sunil Verma",
      phone: "+91 9876543212",
      stubbleType: "Bajra Stubble",
      quantity: 400,
      pricePerUnit: 150,
      location: "UP",
      available: true
    },
    {
      id: 4,
      farmerName: "Anil Sharma",
      phone: "+91 9876543213",
      stubbleType: "Barley Stubble",
      quantity: 600,
      pricePerUnit: 220,
      location: "Punjab",
      available: true
    },
    {
      id: 5,
      farmerName: "Ravi Gupta",
      phone: "+91 9876543214",
      stubbleType: "Wheat Stubble",
      quantity: 700,
      pricePerUnit: 200,
      location: "Haryana",
      available: true
    },
    {
      id: 6,
      farmerName: "Karan Mehta",
      phone: "+91 9876543215",
      stubbleType: "Rice Stubble",
      quantity: 800,
      pricePerUnit: 180,
      location: "UP",
      available: true
    },
    {
      id: 7,
      farmerName: "Vikram Singh",
      phone: "+91 9876543216",
      stubbleType: "Bajra Stubble",
      quantity: 300,
      pricePerUnit: 150,
      location: "Punjab",
      available: true
    },
    {
      id: 8,
      farmerName: "Deepak Kumar",
      phone: "+91 9876543217",
      stubbleType: "Barley Stubble",
      quantity: 400,
      pricePerUnit: 220,
      location: "Haryana",
      available: true
    },
    {
      id: 9,
      farmerName: "Suresh Yadav",
      phone: "+91 9876543218",
      stubbleType: "Wheat Stubble",
      quantity: 500,
      pricePerUnit: 200,
      location: "UP",
      available: true
    },
    {
      id: 10,
      farmerName: "Ajay Sharma",
      phone: "+91 9876543219",
      stubbleType: "Rice Stubble",
      quantity: 600,
      pricePerUnit: 180,
      location: "Punjab",
      available: true
    }
  ]);
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    stubbleType: 'all',
    location: 'all',
    availability: 'all'
  });
  const [sortConfig, setSortConfig] = useState({
    key: 'pricePerUnit',
    direction: 'asc'
  });

  // Filter options
  const stubbleTypes = ['Wheat Stubble', 'Rice Stubble', 'Bajra Stubble', 'Barley Stubble'];
  const locations = ['Punjab', 'Haryana', 'UP'];

  // Handle search
  const handleSearch = (value) => {
    setSearchTerm(value);
    filterProducts(value, filters, sortConfig);
  };

  // Handle filters
  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    filterProducts(searchTerm, newFilters, sortConfig);
  };

  // Handle sorting
  const handleSort = (key) => {
    const direction = sortConfig.key === key && sortConfig.direction === 'asc' ? 'desc' : 'asc';
    setSortConfig({ key, direction });
    filterProducts(searchTerm, filters, { key, direction });
  };

  // Filter products based on search, filters, and sort
  const filterProducts = (search, filterConfig, sortConfig) => {
    let result = [...products];

    // Apply search
    if (search) {
      result = result.filter(product =>
        product.farmerName.toLowerCase().includes(search.toLowerCase()) ||
        product.stubbleType.toLowerCase().includes(search.toLowerCase()) ||
        product.location.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Apply filters
    if (filterConfig.stubbleType !== 'all') {
      result = result.filter(product => product.stubbleType === filterConfig.stubbleType);
    }
    if (filterConfig.location !== 'all') {
      result = result.filter(product => product.location === filterConfig.location);
    }
    if (filterConfig.availability !== 'all') {
      result = result.filter(product => product.available === (filterConfig.availability === 'available'));
    }

    // Apply sorting
    result.sort((a, b) => {
      if (sortConfig.direction === 'asc') {
        return a[sortConfig.key] > b[sortConfig.key] ? 1 : -1;
      }
      return a[sortConfig.key] < b[sortConfig.key] ? 1 : -1;
    });

    setFilteredProducts(result);
  };

  // Handle order
  const handleOrder = () => {
    // Add order logic here
    toast.success(`Order placed for ${orderQuantity} kg of ${orderStubbleType}`);
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Available Stubble</h1>
        <p className="mt-2 text-gray-600">Browse and order stubble from farmers</p>
      </div>

      {/* Search and Filters */}
      <div className="mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Search */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search by farmer, stubble type..."
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
          />
          <SearchIcon className="h-5 w-5 text-gray-400 absolute left-3 top-3" />
        </div>

        {/* Filters */}
        <div>
          <select
            value={filters.stubbleType}
            onChange={(e) => handleFilterChange('stubbleType', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
          >
            <option value="all">All Stubble Types</option>
            {stubbleTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        <div>
          <select
            value={filters.location}
            onChange={(e) => handleFilterChange('location', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
          >
            <option value="all">All Locations</option>
            {locations.map(location => (
              <option key={location} value={location}>{location}</option>
            ))}
          </select>
        </div>

        <div>
          <select
            value={filters.availability}
            onChange={(e) => handleFilterChange('availability', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
          >
            <option value="all">All Availability</option>
            <option value="available">Available</option>
            <option value="unavailable">Unavailable</option>
          </select>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{product.farmerName}</h3>
                <p className="text-sm text-gray-500">{product.location}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                product.available 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>{product.available ? 'Available' : 'Unavailable'}</span>
            </div>

            <div className="mt-4 space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Stubble Type</span>
                <span className="font-medium">{product.stubbleType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Quantity</span>
                <span className="font-medium">{product.quantity} kg</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Price per kg</span>
                <span className="font-medium">₹{product.pricePerUnit}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <PhoneIcon className="h-4 w-4 mr-2" />
                <span>{product.phone}</span>
              </div>
            </div>

            <button
              onClick={() => handleOrder(product)}
              disabled={!product.available}
              className={`mt-4 w-full flex items-center justify-center px-4 py-2 rounded-lg ${
                product.available
                  ? 'bg-green-600 text-white hover:bg-green-700'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
            >
              <ShoppingCartIcon className="h-5 w-5 mr-2" />
              {product.available ? 'Place Order' : 'Out of Stock'}
            </button>
          </div>
        ))}
      </div>

      {/* No Results */}
      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No products found matching your criteria</p>
        </div>
      )}
    </div>
  );
};

export default BuyerOrders; 