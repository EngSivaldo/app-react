import { useCart } from '../store/CartContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export function ProductCard({ product }) {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  // Função disparada ao clicar no botão "+"
  const handleAddToCart = () => {
    addToCart(product);

    // Notificação interativa (UX de alto nível)
    toast.success((t) => (
      <div className="flex items-center justify-between gap-4 min-w-[250px]">
        <div className="flex flex-col">
          <span className="font-bold text-sm text-gray-800">Adicionado!</span>
          <span className="text-xs text-gray-500 truncate w-32">{product.name}</span>
        </div>
        
        <button 
          onClick={() => {
            toast.dismiss(t.id); // Fecha o aviso
            navigate('/checkout'); // Leva o usuário ao caixa
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg text-xs font-bold transition-colors shadow-sm"
        >
          FINALIZAR ➔
        </button>
      </div>
    ), {
      duration: 4000,
      position: 'bottom-right',
      style: {
        padding: '12px',
        borderRadius: '12px',
        border: '1px solid #E5E7EB'
      }
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden group hover:shadow-md transition-all duration-300">
      {/* Container da Imagem */}
      <div className="relative h-48 overflow-hidden bg-gray-100">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <span className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider text-gray-600 border border-gray-100">
          {product.category}
        </span>
      </div>

      {/* Informações do Produto */}
      <div className="p-5">
        <h3 className="font-bold text-gray-800 text-lg mb-1 line-clamp-1">
          {product.name}
        </h3>
        
        <div className="flex items-center justify-between mt-4">
          <div>
            <p className="text-[10px] text-gray-400 uppercase font-bold tracking-tight">Preço à vista</p>
            <p className="text-xl font-black text-blue-600">
              R$ {product.price.toFixed(2)}
            </p>
          </div>

          <button 
            onClick={handleAddToCart}
            className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-xl transition-all active:scale-90 shadow-lg shadow-blue-100 group/btn"
            title="Adicionar ao carrinho"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              strokeWidth={2.5} 
              stroke="currentColor" 
              className="w-5 h-5 group-hover/btn:rotate-90 transition-transform"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}