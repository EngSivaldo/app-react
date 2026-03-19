import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useAuth } from "../store/AuthContext";
import toast from "react-hot-toast";

export function Profile() {
  const { user, updateUser, logout } = useAuth();
  
  // Inicializamos o formulário
  const { register, handleSubmit, setValue } = useForm();

  // "Efeito" de Engenharia: Quando o componente nasce, 
  // buscamos os dados do Contexto e colocamos nos Inputs
  useEffect(() => {
    if (user) {
      setValue("fullName", user.fullName);
      setValue("email", user.email);
    }
  }, [user, setValue]);

  const onUpdate = (data) => {
    // Atualiza o Contexto Global (isso mudará o nome no Header também!)
    updateUser(data); 
    toast.success("Perfil atualizado com sucesso!");
  };

  const handleDeleteAccount = () => {
    if (window.confirm("Atenção: deseja realmente excluir sua conta?")) {
      logout();
      toast.error("Sua conta foi removida.");
    }
  };

  if (!user) return <p className="text-center mt-10">Carregando perfil...</p>;

  return (
    <main className="p-8 max-w-2xl mx-auto">
      <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
        <div className="flex flex-col items-center mb-8">
          {/* Avatar dinâmico do usuário */}
          <img 
            src={user.avatar} 
            alt={user.fullName} 
            className="w-24 h-24 rounded-full border-4 border-blue-50 mb-4"
          />
          <h1 className="text-2xl font-black text-gray-800">{user.fullName}</h1>
          <p className="text-sm text-gray-500">{user.email}</p>
        </div>
        
        <form onSubmit={handleSubmit(onUpdate)} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-gray-700">Nome Completo</label>
            <input 
              {...register("fullName")} 
              className="mt-1 w-full p-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-100 transition-all" 
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700">E-mail (Login)</label>
            <input 
              {...register("email")} 
              className="mt-1 w-full p-3 border rounded-xl bg-gray-50 text-gray-400 outline-none cursor-not-allowed" 
              readOnly 
            />
          </div>

          <div className="flex gap-4 pt-4">
            <button 
              type="submit" 
              className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 active:scale-95 transition-all"
            >
              Salvar Alterações
            </button>
            
            <button 
              type="button" 
              onClick={handleDeleteAccount}
              className="px-6 py-3 text-red-500 font-bold border border-red-100 rounded-xl hover:bg-red-50 transition-all"
            >
              Excluir Conta
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}