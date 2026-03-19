import { Navigate } from 'react-router-dom';
import { useAuth } from '../store/AuthContext';

export function PrivateRoute({ children }) {
  const { signed } = useAuth();
  
  // Se não estiver logado, manda para o login. Se estiver, deixa passar (children)
  return signed ? children : <Navigate to="/login" />;
}