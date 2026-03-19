import { Routes, Route } from 'react-router-dom';
import { Home } from '../pages/Home';
import { Checkout } from '../pages/Checkout';
import { Login } from '../pages/Login';
import { Register } from '../pages/Register';
import { Profile } from '../pages/Profile';
import { PrivateRoute } from './RouteGuard';

export function AppRoutes() {
  return (
    <Routes>
      {/* Rotas Abertas */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Rotas que EXIGEM login */}
      <Route 
        path="/checkout" 
        element={<PrivateRoute> <Checkout /> </PrivateRoute>} 
      />
      <Route 
        path="/profile" 
        element={<PrivateRoute> <Profile /> </PrivateRoute>} 
      />

      <Route path="*" element={<h1>404 - Not Found</h1>} />
    </Routes>
  );
}