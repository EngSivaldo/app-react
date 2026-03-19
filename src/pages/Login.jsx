import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../store/AuthContext";
import { authService } from "../services/authService"; // Importa o serviço real

const loginSchema = yup.object({
  email: yup.string().email("E-mail inválido").required("O e-mail é obrigatório"),
  password: yup.string().required("A senha é obrigatória"),
}).required();

export function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(loginSchema)
  });

  const onSubmit = async (data) => {
    // LOG DE ENGENHARIA: Verifique se isso aparece no Console (F12)
    console.log("🚀 Dados enviados pelo formulário:", data);
    
    const loader = toast.loading("Conectando ao banco...");
    
    try {
      const response = await authService.login(data.email, data.password);
      console.log("✅ Resposta da API:", response);

      login(response.user, response.token);
      toast.success(`Bem-vindo, ${response.user.fullName}!`, { id: loader });
      navigate("/");
    } catch (error) {
      console.error("❌ Erro no Login:", error);
      const message = error.response?.data?.message || "Erro ao acessar banco de dados";
      toast.error(message, { id: loader });
    }
  };

  return (
    <main className="min-h-[80vh] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <h1 className="text-3xl font-black text-gray-900">Login Real</h1>
        
        {/* Verifique se o onSubmit está exatamente assim */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 mt-6">
          <div>
            <label className="block text-sm font-bold text-gray-700">E-mail</label>
            <input 
              {...register("email")} 
              className={`mt-1 w-full p-3 border rounded-xl outline-none ${errors.email ? 'border-red-500' : 'focus:border-blue-500'}`} 
            />
            {/* EXIBIR ERRO: Se o e-mail for inválido, o form não envia */}
            {errors.email && <span className="text-red-500 text-xs">{errors.email.message}</span>}
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700">Senha</label>
            <input 
              {...register("password")} 
              type="password" 
              className={`mt-1 w-full p-3 border rounded-xl outline-none ${errors.password ? 'border-red-500' : 'focus:border-blue-500'}`} 
            />
            {errors.password && <span className="text-red-500 text-xs">{errors.password.message}</span>}
          </div>

          <button 
            type="submit" 
            className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 transition-colors"
          >
            Entrar
          </button>
        </form>
      </div>
    </main>
  );
}