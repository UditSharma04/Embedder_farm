import { farmImage } from '../../assets';

const Landing = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold text-primary">FarmConnect</div>
            <div className="space-x-4">
              <a href="/login" className="nav-link">Login</a>
              <a href="/signup" className="btn-primary">Get Started</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Connecting Farmers to Global Markets
              </h1>
              <p className="mt-6 text-gray-600 text-lg">
                Empowering farmers with direct market access, secure payments, and real-time insights
              </p>
              <div className="mt-8 space-x-4">
                <a href="/signup" className="btn-primary">Get Started</a>
                <a href="#features" className="btn-secondary">Learn More</a>
              </div>
            </div>
            <div className="animate-float">
              <img src={farmImage} alt="Farming Illustration" className="w-full" />
            </div>
          </div>
        </div>
      </div>

      {/* Metrics Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="metric-card">
            <div className="text-4xl font-bold text-primary">10K+</div>
            <div className="text-gray-600 mt-2">Active Farmers</div>
          </div>
          <div className="metric-card">
            <div className="text-4xl font-bold text-primary">50K+</div>
            <div className="text-gray-600 mt-2">Products Listed</div>
          </div>
          <div className="metric-card">
            <div className="text-4xl font-bold text-primary">100K+</div>
            <div className="text-gray-600 mt-2">Successful Trades</div>
          </div>
          <div className="metric-card">
            <div className="text-4xl font-bold text-primary">15+</div>
            <div className="text-gray-600 mt-2">States Covered</div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose FarmConnect?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We provide the tools and platform you need to succeed in agricultural commerce
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="feature-card">
            <div className="text-primary text-2xl font-semibold mb-4">Direct Market Access</div>
            <p className="text-gray-600">Connect directly with buyers and get better prices for your produce</p>
          </div>
          <div className="feature-card">
            <div className="text-primary text-2xl font-semibold mb-4">Secure Payments</div>
            <p className="text-gray-600">Safe and secure payment gateway for all transactions</p>
          </div>
          <div className="feature-card">
            <div className="text-primary text-2xl font-semibold mb-4">Market Insights</div>
            <p className="text-gray-600">Get real-time market prices and demand forecasts</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white/80 backdrop-blur-md py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary mb-4">FarmConnect</div>
            <p className="text-gray-600">Empowering farmers across India</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing; 