import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';
import Landing from './pages/landing';
import Signup from './pages/auth/signup';
import Login from './pages/auth/login';
import BuyerDashboard from './pages/buyer';
import FarmerDashboard from './pages/farmer';
import Profile from './pages/profile';
import BuyerLayout from './components/BuyerLayout';
import BuyerAnalytics from './pages/buyer/analytics';
import BuyerOrders from './pages/buyer/orders';
import BuyerTransactions from './pages/buyer/transactions';
import BuyerPerformance from './pages/buyer/performance';
import FarmerLayout from './components/FarmerLayout';
import FarmerAnalytics from './pages/farmer/analytics';
import FarmerOrders from './pages/farmer/orders';
import FarmerTransactions from './pages/farmer/transactions';
import FarmerPerformance from './pages/farmer/performance';

const App = () => {
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signup" element={<PublicRoute><Signup /></PublicRoute>} />
        <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
        {user ? (
          user.role === 'buyer' ? (
            <Route path="/" element={<Navigate to="/buyer-dashboard" />} />
          ) : (
            <Route path="/" element={<Navigate to="/farmer-dashboard" />} />
          )
        ) : (
          <Route path="/" element={<Navigate to="/login" />} />
        )}
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        
        <Route path="/buyer-dashboard" element={<ProtectedRoute><BuyerLayout /></ProtectedRoute>}>
          <Route index element={<BuyerDashboard />} />
          <Route path="analytics" element={<BuyerAnalytics />} />
          <Route path="orders" element={<BuyerOrders />} />
          <Route path="transactions" element={<BuyerTransactions />} />
          <Route path="performance" element={<BuyerPerformance />} />
        </Route>

        <Route path="/farmer-dashboard" element={<ProtectedRoute><FarmerLayout /></ProtectedRoute>}>
          <Route index element={<FarmerDashboard />} />
          <Route path="analytics" element={<FarmerAnalytics />} />
          <Route path="orders" element={<FarmerOrders />} />
          <Route path="transactions" element={<FarmerTransactions />} />
          <Route path="performance" element={<FarmerPerformance />} />
        </Route>
      </Routes>
      <Toaster 
        position="top-right"
        toastOptions={{
          success: {
            duration: 3000,
            style: {
              background: '#2E7D32',
              color: 'white',
            },
          },
          error: {
            duration: 4000,
            style: {
              background: '#D32F2F',
              color: 'white',
            },
          },
        }}
      />
    </Router>
  );
};

export default App;
