import { Navigate } from 'react-router-dom';

const PublicRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  // Only redirect if both token and user exist
  if (token && user) {
    return <Navigate to={user.userType === 'farmer' ? '/farmer-dashboard' : '/buyer-dashboard'} replace />;
  }

  return children;
};

export default PublicRoute; 