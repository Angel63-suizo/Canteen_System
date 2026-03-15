import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from "../../context/AuthContext";

const Icons = {
  CanteenLogo: (props) => (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M7.7 20C7.7 20.44 8.06 20.8 8.5 20.8C8.94 20.8 9.3 20.44 9.3 20C9.3 19.56 8.94 19.2 8.5 19.2C8.06 19.2 7.7 19.56 7.7 20Z" fill="white"/>
      <path d="M12.9 20C12.9 20.44 13.26 20.8 13.7 20.8C14.14 20.8 14.5 20.44 14.5 20C14.5 19.56 14.14 19.2 13.7 19.2C13.26 19.2 12.9 19.56 12.9 20Z" fill="white"/>
      <path d="M18.1 20C18.1 20.44 18.46 20.8 18.9 20.8C19.34 20.8 19.7 20.44 19.7 20C19.7 19.56 19.34 19.2 18.9 19.2C18.46 19.2 18.1 19.56 18.1 20Z" fill="white"/>
      <path d="M17.16 3.86L15.34 2.04C15.11 1.81 14.74 1.81 14.51 2.04L13.1 3.45L11.69 2.04C11.46 1.81 11.09 1.81 10.86 2.04L9.04 3.86L10.45 5.27L11.86 3.86L13.27 5.27L14.68 3.86L16.09 5.27L17.16 3.86Z" fill="white"/>
      <path d="M11 7.21V16H13V7.21C14.65 7.46 16.03 8.71 16.37 10.35H18.4C18.01 7.58 15.71 5.43 12.9 5.23V5H11.1V5.23C8.29 5.43 5.99 7.58 5.6 10.35H7.63C7.97 8.71 9.35 7.46 11 7.21Z" fill="white"/>
    </svg>
  ),
  Dashboard: (props) => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}><path d="M10 3H3V10H10V3Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M21 3H14V10H21V3Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M10 14H3V21H10V14Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M21 14H14V21H21V14Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  Menu: (props) => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}><path d="M19 12H5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M19 6H5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M19 18H5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  POS: (props) => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}><path d="M1 1H4L6.68 14.39C6.77144 14.8504 7.02191 15.264 7.38755 15.5583C7.75318 15.8526 8.2107 16.009 8.68 16H19.34C19.8093 16.009 20.2668 15.8526 20.6325 15.5583C20.9981 15.264 21.2486 14.8504 21.34 14.39L23 6H6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/></svg>,
  Orders: (props) => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}><path d="M16 4H18C18.5304 4 19.0391 4.21071 19.4142 4.58579C19.7893 4.96086 20 5.46957 20 6V20C20 20.5304 19.7893 21.0391 19.4142 21.4142C19.0391 21.7893 18.5304 22 18 22H6C5.46957 22 4.96086 21.7893 4.58579 21.4142C4.21071 21.0391 4 20.5304 4 20V6C4 5.46957 4.21071 4.96086 4.58579 4.58579C4.96086 4.21071 5.46957 4 6 4H8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M15 2H9C8.44772 2 8 2.44772 8 3V5C8 5.55228 8.44772 6 9 6H15C15.5523 6 16 5.55228 16 5V3C16 2.44772 15.5523 2 15 2Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  Inventory: (props) => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}><path d="M21 16V8C20.9996 7.64927 20.9071 7.30481 21.7317 7.00156C21.5563 6.69832 21.3033 6.44531 21 6.27L13 1.67C12.693 1.49383 12.349 1.40112 12 1.40112C11.651 1.40112 11.307 1.49383 11 1.67L3 6.27C2.69669 6.44531 2.44371 6.69832 2.26831 7.00156C2.09291 7.30481 2.00037 7.64927 2 8V16C2.00037 16.3507 2.09291 16.6952 2.26831 16.9984C2.44371 17.3017 2.69669 17.5547 3 17.73L11 22.33C11.307 22.5062 11.651 22.5989 12 22.5989C12.349 22.5989 12.693 22.5062 13 22.33L21 17.73C21.3033 17.5547 21.5563 17.3017 21.7317 16.9984C21.9071 16.6952 20.9996 16.3507 21 16Z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M3.27 6.96L12 12.01L20.73 6.96" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M12 22.08V12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  Logout: (props) => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}><path d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M16 17L21 12L16 7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M21 12H9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>,
};

const Sidebar = () => {
  const auth = useAuth();
  
  if (!auth) return <div className="p-4 text-red-500">No Auth Provider!</div>;
  if (auth.loading) return <div className="p-4 text-gray-500">Loading...</div>;
  if (!auth.user) return <div className="p-4 text-gray-500">No user logged in.</div>;

  const handleLogout = () => {
    if (auth.logout) {
      auth.logout(); 
    } else {
      console.warn("Auth context doesn't implement logout yet!");
    }
  };

const getNavItems = () => {
    console.log("Current user role is:", auth.user.role);

    const role = auth.user.role?.toLowerCase() || '';

    if (role.includes('admin')) {
      return [
        { icon: Icons.Dashboard, label: 'Dashboard', path: '/admin/dashboard' },
        { icon: Icons.Menu, label: 'Menu', path: '/admin/menu' },
        { icon: Icons.POS, label: 'POS', path: '/admin/pos' },
        { icon: Icons.Orders, label: 'Orders', path: '/admin/orders' },
        { icon: Icons.Inventory, label: 'Inventory', path: '/admin/inventory' },
      ];
    } 
    
    if (role.includes('cashier')) {
      return [
        { icon: Icons.POS, label: 'POS', path: '/pos/dashboard' },
        { icon: Icons.Orders, label: 'Orders', path: '/pos/orders' },
        { icon: Icons.Menu, label: 'Menu', path: '/pos/menu' },
      ];
    }

  if (role.includes('customer')) {
    return [
      { icon: Icons.Menu, label: 'Browse Menu', path: '/customer/menu' },
      { icon: Icons.Orders, label: 'My Orders', path: '/customer/orders' },
    ];
  }

    return [];
  };
  return (
    <div className="flex h-screen w-64 flex-col border-r border-gray-100 bg-white font-sans text-sm antialiased">
      
      <div className="flex items-center gap-3 border-b border-gray-100 p-6">
        <div className="flex size-11 items-center justify-center rounded-xl bg-orange-600">
          <Icons.CanteenLogo className="size-8" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-gray-900">Canteen</h1>
          <p className="text-sm font-medium text-gray-500">
            {auth.user.role ? auth.user.role.charAt(0).toUpperCase() + auth.user.role.slice(1) : 'User'}
          </p>
        </div>
      </div>

      <nav className="flex flex-1 flex-col gap-2 p-6 pt-8">
        {getNavItems().map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors duration-150 ease-in-out font-medium
               ${isActive 
                 ? 'bg-orange-50 text-orange-600' 
                 : 'text-gray-700 hover:bg-gray-50' 
               }`
            }
          >
            <item.icon className="size-5 stroke-current" strokeWidth={2.5} />
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto border-t border-gray-100 p-6 pt-5">
        <div className="mb-4 space-y-0.5">
          <p className="font-semibold text-gray-900">
            {auth.user.name || 'Admin User'}
          </p>
          <p className="text-gray-500 break-all">
            {auth.user.email || 'admin@canteen.com'}
          </p>
        </div>

        <button 
          onClick={() => {
            auth.logout();
          }}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-gray-700 hover:bg-red-50 hover:text-red-700 transition font-medium"
        >
          <Icons.Logout className="size-5 stroke-current" strokeWidth={2.5} />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;