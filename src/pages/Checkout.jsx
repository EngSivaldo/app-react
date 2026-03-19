import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { useCart } from "../store/CartContext";
import { checkoutSchema } from "./CheckoutSchema";

export function Checkout() {
  const navigate = useNavigate();
  const { cart, cartCount, clearCart } = useCart();
  
  const { 
    register, 
    handleSubmit, 
    reset, 
    formState: { errors } 
  } = useForm({
    resolver: yupResolver(checkoutSchema)
  });

  const onSubmit = (data) => {
    // Simulação de envio para API (Aqui você enviaria o JSON para o Django/Node)
    console.log("🚀 Enviando Pedido:", { 
      cliente: data, 
      produtos: cart,
      total: total 
    });
    
    // 1. Limpa o estado global e LocalStorage
    clearCart();
    
    // 2. Limpa os campos do formulário
    reset();

    // 3. Feedback e Redirecionamento
    alert("Pedido enviado com sucesso! Voltando para a vitrine.");
    navigate("/"); 
  };

  const onInvalid = (errors) => {
    console.warn("❌ Verifique os campos obrigatórios:", errors);
  };

  // Cálculo de total considerando a quantidade de cada item
  const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  return (
    <main className="p-8 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
      {/* Coluna 1: Formulário de Entrega */}
      <section>
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Dados de Entrega</h2>
        
        <form onSubmit={handleSubmit(onSubmit, onInvalid)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Nome Completo</label>
            <input 
              {...register("fullName")} 
              className={`mt-1 w-full p-3 border rounded-lg focus:ring-2 outline-none transition-all ${errors.fullName ? 'border-red-500 focus:ring-red-200' : 'focus:ring-blue-500'}`} 
            />
            <p className="text-red-500 text-xs mt-1 font-medium">{errors.fullName?.message}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">E-mail</label>
            <input 
              {...register("email")} 
              type="email"
              className={`mt-1 w-full p-3 border rounded-lg focus:ring-2 outline-none transition-all ${errors.email ? 'border-red-500 focus:ring-red-200' : 'focus:ring-blue-500'}`} 
            />
            <p className="text-red-500 text-xs mt-1 font-medium">{errors.email?.message}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Endereço Completo</label>
            <input 
              {...register("address")} 
              placeholder="Rua, número e bairro"
              className={`mt-1 w-full p-3 border rounded-lg focus:ring-2 outline-none transition-all ${errors.address ? 'border-red-500 focus:ring-red-200' : 'focus:ring-blue-500'}`} 
            />
            <p className="text-red-500 text-xs mt-1 font-medium">{errors.address?.message}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">CEP (8 dígitos)</label>
              <input 
                {...register("zipCode")} 
                maxLength={8}
                className={`mt-1 w-full p-3 border rounded-lg focus:ring-2 outline-none transition-all ${errors.zipCode ? 'border-red-500 focus:ring-red-200' : 'focus:ring-blue-500'}`} 
              />
              <p className="text-red-500 text-xs mt-1 font-medium">{errors.zipCode?.message}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Cidade</label>
              <input 
                {...register("city")} 
                className={`mt-1 w-full p-3 border rounded-lg focus:ring-2 outline-none transition-all ${errors.city ? 'border-red-500 focus:ring-red-200' : 'focus:ring-blue-500'}`} 
              />
              <p className="text-red-500 text-xs mt-1 font-medium">{errors.city?.message}</p>
            </div>
          </div>

          <button 
            type="submit" 
            disabled={cart.length === 0}
            className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 active:scale-95 transition-all shadow-lg shadow-blue-100 disabled:bg-gray-400 disabled:shadow-none disabled:cursor-not-allowed"
          >
            Finalizar Pedido
          </button>
        </form>
      </section>

      {/* Coluna 2: Resumo Dinâmico */}
      <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-fit sticky top-24">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Resumo do Pedido ({cartCount})</h2>
        
        <div className="space-y-4 max-h-80 overflow-y-auto mb-6 pr-2">
          {cart.length === 0 ? (
            <p className="text-gray-400 text-center py-8">Seu carrinho está vazio.</p>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="flex gap-4 border-b border-gray-50 pb-4 last:border-0">
                <img src={item.image} className="w-16 h-16 object-cover rounded-lg bg-gray-100" alt={item.name} />
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <p className="font-bold text-gray-800 text-sm line-clamp-1">{item.name}</p>
                    <span className="text-[10px] bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full font-bold">
                      x{item.quantity}
                    </span>
                  </div>
                  <p className="text-blue-600 font-bold text-sm">
                    R$ {(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
        
        <div className="border-t border-gray-100 pt-4 flex justify-between items-center text-xl font-black text-gray-900">
          <span>Total:</span>
          <span className="text-blue-600">R$ {total.toFixed(2)}</span>
        </div>
      </section>
    </main>
  );
}