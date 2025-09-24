import { Navigate } from 'react-router';
import useAuth from '../../hooks/useAuth';

export default function PrivateRoute({ children }) {
  const { auth } = useAuth();

  return <>{auth?.user ? children : <Navigate to="/login" replace />}</>;
}
