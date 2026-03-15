import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/common/Layout';
import ProtectedRoute from './components/auth/ProtectedRoute';
import AdminDashboard from './components/dashboard/AdminDashboard';
import MenuManagement from './components/menu/MenuManagement';
import POSInterface from './components/orders/POSInterface'; // Your POS logic
import CustomerDashboard from './components/dashboard/CustomerDashboard';
import Login from './components/auth/Login';
import Unauthorized from './components/auth/Unauthorized';
import OrderQueue from './components/orders/OrderQueue';
import InventoryTable from './components/inventory/InventoryTable';
import OrderHistory from './components/orders/OrderHistory';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        
        <Route path="/admin" element={
          <ProtectedRoute allowedRoles={['admin']}>
            <Layout />
          </ProtectedRoute>
        }>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="pos" element={<POSInterface />} />
          <Route path="menu" element={<MenuManagement />} />
          <Route path="orders" element={<OrderQueue />} />
          <Route path="inventory" element={<InventoryTable />} />
          <Route index element={<Navigate to="dashboard" replace />} />
        </Route>

        <Route path="/pos" element={
          <ProtectedRoute allowedRoles={['cashier', 'admin']}>
            <Layout />
          </ProtectedRoute>
        }>
          <Route path="dashboard" element={<POSInterface />} />
          <Route path="menu" element={<MenuManagement />} /> 
          <Route path="orders" element={<OrderQueue />} />
          <Route index element={<Navigate to="dashboard" replace />} />
        </Route>

        <Route path="/customer" element={
          <ProtectedRoute allowedRoles={['customer']}>
            <Layout />
          </ProtectedRoute>
        }>
          <Route path="menu" element={<CustomerDashboard />} />
          <Route path="orders" element={<OrderHistory />} /> 
          <Route index element={<Navigate to="menu" replace />} />
        </Route>

        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;