import { Navigate } from 'react-router-dom';
import { authService } from '../../services/authService';
const ProtectedRoute = ({ children, role }) => {
  const user = authService.getCurrentUser();

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (role && user.role !== role) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
};

export default ProtectedRoute;