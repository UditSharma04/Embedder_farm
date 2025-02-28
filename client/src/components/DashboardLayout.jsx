// This file is no longer needed and can be removed or commented out.
// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import toast from 'react-hot-toast';
// import Sidebar from './Sidebar';

// const DashboardLayout = ({ children }) => {
//   const navigate = useNavigate();
//   const [isProfileOpen, setIsProfileOpen] = useState(false);
//   const user = JSON.parse(localStorage.getItem('user'));

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     localStorage.removeItem('user');
//     toast.success('Logged out successfully');
//     navigate('/login');
//   };

//   return (
//     <div className="flex h-screen">
//       <Sidebar />
//       <div className="flex-1 overflow-y-auto p-6 bg-gray-100">
//         {children}
//       </div>
//     </div>
//   );
// };

// export default DashboardLayout; 