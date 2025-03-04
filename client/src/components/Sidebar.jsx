import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { 
  HomeIcon, 
  UserIcon, 
  ChartBarIcon, 
  ShoppingCartIcon, 
  LogoutIcon,
  CogIcon,
  ClipboardListIcon,
  CurrencyRupeeIcon,
  TrendingUpIcon
} from '@heroicons/react/outline';

// This should only be imported by layout components, not directly by pages
const Sidebar = () => {
  const user = JSON.parse(localStorage.getItem('user')); // Get user data from local storage
  const location = useLocation();
  const navigate = useNavigate();
  
  // Fix: Check if user exists and role is 'buyer'
  const isBuyer = user?.userType === 'buyer';

  const isActiveRoute = (route) => {
    return location.pathname === route;
  };

  const navItems = [
    {
      title: 'Dashboard',
      icon: HomeIcon,
      path: isBuyer ? "/buyer-dashboard" : "/farmer-dashboard",
      color: 'text-blue-600'
    },
    {
      title: 'Profile',
      icon: UserIcon,
      path: '/profile',
      color: 'text-purple-600'
    },
    {
      title: 'Analytics',
      icon: ChartBarIcon,
      path: isBuyer ? "/buyer-dashboard/analytics" : "/farmer-dashboard/analytics",
      color: 'text-green-600'
    },
    {
      title: 'Orders',
      icon: ClipboardListIcon,
      path: isBuyer ? "/buyer-dashboard/orders" : "/farmer-dashboard/orders",
      color: 'text-orange-600'
    },
    {
      title: 'Transactions',
      icon: CurrencyRupeeIcon,
      path: isBuyer ? "/buyer-dashboard/transactions" : "/farmer-dashboard/transactions",
      color: 'text-yellow-600'
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    toast.success('Logged out successfully');
    navigate('/login');
  };

  return (
    <div className="flex flex-col h-screen bg-white text-gray-800 w-64 shadow-lg border-r border-gray-200">
      <div className="flex items-center justify-center h-16 border-b border-gray-200 bg-gradient-to-r from-green-500 to-green-600">
        <h1 className="text-xl font-bold text-white">Farmer's Market</h1>
      </div>
      
      {/* User Info */}
      <div className="px-4 py-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
            <UserIcon className="h-6 w-6 text-green-600" />
          </div>
          <div>
            <p className="text-sm font-medium">{user?.fullName}</p>
            <p className="text-xs text-gray-500 capitalize">{user?.userType}</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1 px-3">
          {navItems.map((item) => (
            <li key={item.title}>
              <Link
                to={item.path}
                className={`flex items-center px-3 py-2 rounded-lg transition-colors duration-150 ease-in-out
                  ${isActiveRoute(item.path)
                    ? 'bg-green-50 text-green-600'
                    : 'hover:bg-gray-50'
                  }`}
              >
                <item.icon className={`h-5 w-5 ${item.color}`} />
                <span className="ml-3 text-sm font-medium">{item.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Logout Button */}
      <div className="p-4 border-t border-gray-200">
        <button
          onClick={handleLogout}
          className="flex w-full items-center px-3 py-2 rounded-lg text-red-600 hover:bg-red-50 transition-colors duration-150 ease-in-out"
        >
          <LogoutIcon className="h-5 w-5" />
          <span className="ml-3 text-sm font-medium">Logout</span>
        </button>
        <p className="text-xs text-gray-500 text-center mt-4">© 2024 Farmer's Market</p>
      </div>
    </div>
  );
};

export default Sidebar; 