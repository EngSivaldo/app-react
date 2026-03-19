import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../store/CartContext';
import { useAuth } from '../store/AuthContext';

export function Header() {
  const { cartCount } = useCart();
  const { user, logout, signed } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-white border-b border-gray-100 p-4 sticky top-0 z-50 shadow-sm">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-black text-blue-600 tracking-tighter">
          DevStore
        </Link>

        <nav className="flex items-center gap-6">
          {/* Lógica Condicional: Login vs Perfil */}
          {signed && user ? (
            <div className="flex items-center gap-4 animate-fade-in">
              <Link 
                to="/profile" 
                className="flex items-center gap-2 text-sm font-semibold text-gray-700 hover:text-blue-600 transition-all"
              >
                {/* Avatar pequeno opcional para dar o toque "Top" */}
                <img 
                  src={user.avatar} 
                  alt="" 
                  className="w-7 h-7 rounded-full border border-gray-200" 
                />
                <span>Olá, {user.fullName?.split(' ')[0]}</span>
              </Link>
              
              <button 
                onClick={handleLogout} 
                className="text-[10px] font-black text-red-400 hover:text-red-600 uppercase tracking-widest transition-colors"
              >
                Sair
              </button>
            </div>
          ) : (
            <Link 
              to="/login" 
              className="text-sm font-bold text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-lg transition-all border border-transparent hover:border-blue-100"
            >
              Entrar
            </Link>
          )}

          {/* Carrinho */}
          <Link 
            to="/checkout" 
            className="relative p-2.5 bg-gray-50 rounded-xl hover:bg-gray-100 transition-all group"
          >
            <span className="text-xl group-hover:scale-110 block transition-transform">🛒</span>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-bold shadow-sm border-2 border-white">
                {cartCount}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
}