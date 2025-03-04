import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { farmImage } from '../../../assets';
import toast from 'react-hot-toast';
import EmailVerification from '../../../components/EmailVerification';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    identifier: '', // Can be either phone or email
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showVerification, setShowVerification] = useState(false);
  const [unverifiedEmail, setUnverifiedEmail] = useState('');
  const [userType, setUserType] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!formData.identifier || !formData.password || !userType) {
      setError('Please fill in all fields and select a user type');
      return;
    }

    // Simulate login success
    localStorage.setItem('token', 'dummy-token'); // Simulated token
    localStorage.setItem('user', JSON.stringify({ userType })); // Simulated user data

    toast.success('Login successful!');

    // Redirect based on user type
    navigate(userType === 'farmer' ? '/farmer-dashboard' : '/buyer-dashboard');
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Image */}
      <div className="hidden lg:flex lg:w-2/5 bg-cover bg-center" 
           style={{ backgroundImage: `url(${farmImage})` }}>
        <div className="w-full h-full bg-green-900/40 p-12 flex flex-col justify-between">
          <div className="text-white">
            <Link to="/" className="text-2xl font-bold">FarmConnect</Link>
          </div>
          <div className="text-white">
            <h2 className="text-3xl font-bold mb-4">Welcome Back!</h2>
            <p className="text-lg">Login to access your account</p>
          </div>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="flex-1 flex flex-col justify-center px-4 sm:px-6 lg:px-20 py-12 bg-white">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
            Login to your account
          </h2>

          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-500 rounded-lg text-sm">
              {error}
            </div>
          )}

          <div className="flex space-x-4 mb-4">
            <button type="button" onClick={() => setUserType('farmer')} className={`btn-primary ${userType === 'farmer' ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-800'}`}>I am Farmer</button>
            <button type="button" onClick={() => setUserType('buyer')} className={`btn-primary ${userType === 'buyer' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}>I am Buyer</button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="identifier" className="block text-sm font-medium text-gray-700">
                Phone Number or Email
              </label>
              <input
                type="text"
                name="identifier"
                id="identifier"
                value={formData.identifier}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-primary focus:border-primary"
                placeholder="Enter your phone number or email"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-primary focus:border-primary"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember"
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                />
                <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">
                  Remember me
                </label>
              </div>
              <Link to="/forgot-password" className="text-sm text-primary hover:text-primary/80">
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full btn-primary ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-gray-600">
            Don't have an account?{' '}
            <Link to="/signup" className="text-primary hover:text-primary/80 font-medium">
              Sign up here
            </Link>
          </p>
        </div>
      </div>

      {showVerification && (
        <EmailVerification
          email={unverifiedEmail}
        />
      )}
    </div>
  );
};

export default Login; 