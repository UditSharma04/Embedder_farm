import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { farmImage } from '../../../assets';
import toast from 'react-hot-toast';
import EmailVerification from '../../../components/EmailVerification';

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

// Indian states and their major cities
const indianStates = {
  'Andhra Pradesh': ['Visakhapatnam', 'Vijayawada', 'Guntur'],
  'Bihar': ['Patna', 'Gaya', 'Muzaffarpur'],
  'Gujarat': ['Ahmedabad', 'Surat', 'Vadodara'],
  'Haryana': ['Gurugram', 'Faridabad', 'Panipat'],
  'Karnataka': ['Bengaluru', 'Mysuru', 'Hubli'],
  'Maharashtra': ['Mumbai', 'Pune', 'Nagpur'],
  'Punjab': ['Chandigarh', 'Ludhiana', 'Amritsar'],
  'Rajasthan': ['Jaipur', 'Jodhpur', 'Udaipur'],
  'Tamil Nadu': ['Chennai', 'Coimbatore', 'Madurai'],
  'Uttar Pradesh': ['Lucknow', 'Kanpur', 'Agra'],
  // Add more states as needed
};

const Signup = () => {
  const navigate = useNavigate();
  const [userType, setUserType] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    location: '',
    password: '',
    confirmPassword: '',
    userType: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [showVerification, setShowVerification] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState('');

  const validatePassword = (password) => {
    if (!passwordRegex.test(password)) {
      setPasswordError(
        'Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character'
      );
      return false;
    }
    setPasswordError('');
    return true;
  };

  const handleUserTypeSelect = (type) => {
    setUserType(type);
    setFormData(prev => ({
      ...prev,
      userType: type.toLowerCase()
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (name === 'password') {
      setPasswordError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setPasswordError('');

    // Validate form
    if (!formData.userType) {
      setError('Please select whether you are a farmer or buyer');
      return;
    }

    if (!formData.fullName || !formData.phone || !formData.location || !formData.email) {
      setError('Please fill in all required fields');
      return;
    }

    if (!validatePassword(formData.password)) {
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (!/^\d{10}$/.test(formData.phone)) {
      setError('Please enter a valid 10-digit phone number');
      return;
    }

    const requestData = {
      fullName: formData.fullName,
      phone: formData.phone,
      email: formData.email,
      location: formData.location,
      password: formData.password,
      userType: formData.userType
    };

    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error('Registration failed:', data);
        throw new Error(data.error || 'Something went wrong');
      }

      toast.success('Account created! Please verify your email.');
      setRegisteredEmail(formData.email);
      setShowVerification(true);
    } catch (err) {
      toast.error(err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleStateChange = (e) => {
    const state = e.target.value;
    setSelectedState(state);
    setSelectedCity('');
    setFormData(prev => ({
      ...prev,
      location: state ? `${state}` : ''
    }));
  };

  const handleCityChange = (e) => {
    const city = e.target.value;
    setSelectedCity(city);
    setFormData(prev => ({
      ...prev,
      location: city ? `${city}, ${selectedState}` : selectedState
    }));
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
            <h2 className="text-3xl font-bold mb-4">Join India's Largest Agricultural Network</h2>
            <p className="text-lg">Connect with buyers and sellers across the country</p>
          </div>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="flex-1 flex flex-col justify-center px-4 sm:px-6 lg:px-20 py-12 bg-white">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
            Create your account
          </h2>

          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-500 rounded-lg text-sm">
              {error}
            </div>
          )}

          {/* User Type Selection */}
          <div className="flex gap-4 mb-8">
            <button
              type="button"
              onClick={() => handleUserTypeSelect('farmer')}
              className={`flex-1 py-3 px-4 rounded-lg border-2 transition-all duration-200
                ${userType === 'farmer' 
                  ? 'border-primary bg-primary text-white' 
                  : 'border-gray-300 hover:border-primary'}`}
            >
              I'm a Farmer
            </button>
            <button
              type="button"
              onClick={() => handleUserTypeSelect('buyer')}
              className={`flex-1 py-3 px-4 rounded-lg border-2 transition-all duration-200
                ${userType === 'buyer' 
                  ? 'border-primary bg-primary text-white' 
                  : 'border-gray-300 hover:border-primary'}`}
            >
              I'm a Buyer
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                id="fullName"
                value={formData.fullName}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-primary focus:border-primary"
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                id="phone"
                value={formData.phone}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-primary focus:border-primary"
                onChange={handleChange}
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-primary focus:border-primary"
                onChange={handleChange}
              />
            </div>

            {/* Location Selection */}
            <div className="space-y-4">
              <div>
                <label htmlFor="state" className="block text-sm font-medium text-gray-700">
                  State
                </label>
                <select
                  id="state"
                  value={selectedState}
                  onChange={handleStateChange}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-primary focus:border-primary bg-white"
                >
                  <option value="">Select State</option>
                  {Object.keys(indianStates).map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
              </div>

              {selectedState && (
                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                    City
                  </label>
                  <select
                    id="city"
                    value={selectedCity}
                    onChange={handleCityChange}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-primary focus:border-primary bg-white"
                  >
                    <option value="">Select City</option>
                    {indianStates[selectedState].map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                    <option value="other">Other</option>
                  </select>
                </div>
              )}

              {selectedState && selectedCity === 'other' && (
                <div>
                  <label htmlFor="customCity" className="block text-sm font-medium text-gray-700">
                    Enter City Name
                  </label>
                  <input
                    type="text"
                    id="customCity"
                    value={formData.location.split(', ')[1] || ''}
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-primary focus:border-primary"
                    onChange={(e) => {
                      const customCity = e.target.value;
                      setFormData(prev => ({
                        ...prev,
                        location: customCity ? `${customCity}, ${selectedState}` : selectedState
                      }));
                    }}
                  />
                </div>
              )}
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
                required
                className={`mt-1 block w-full px-3 py-2 border ${
                  passwordError ? 'border-red-500' : 'border-gray-300'
                } rounded-lg shadow-sm focus:ring-primary focus:border-primary`}
                onChange={handleChange}
              />
              {passwordError && (
                <p className="mt-1 text-sm text-red-500">
                  {passwordError}
                </p>
              )}
              <p className="mt-1 text-xs text-gray-500">
                Password must contain at least 8 characters, including uppercase, lowercase, numbers, and special characters.
              </p>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                value={formData.confirmPassword}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-primary focus:border-primary"
                onChange={handleChange}
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="terms"
                required
                className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
              />
              <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                I agree to the{' '}
                <a href="#" className="text-primary hover:text-primary/80">
                  Terms and Conditions
                </a>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full btn-primary ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="text-primary hover:text-primary/80 font-medium">
              Login here
            </Link>
          </p>

          {showVerification && (
            <EmailVerification
              email={registeredEmail}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Signup; 