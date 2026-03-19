import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../store/AuthContext"; // 1. IMPORTAÇÃO FALTANTE

// Schema de validação
const loginSchema = yup.object({
  email: yup.string().email("Digite um e-mail válido").required("O e-mail é obrigatório"),
  password: yup.string().min(6, "A senha deve ter pelo menos 6 dígitos").required("A senha é obrigatória"),
}).required();

export function Login() {
  const navigate = useNavigate();
  const { login } = useAuth(); // 2. EXTRAINDO A FUNÇÃO DO CONTEXTO
  
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(loginSchema)
  });

  const onSubmit = (data) => {
    try {
      // Simulação de retorno da API (Django/Node)
      const userSimulado = {
        fullName: "Sivaldo Developer", 
        email: data.email,
        avatar: "https://github.com/github.png"
      };

      // 3. Agora a função existe e vai salvar no LocalStorage e no Estado Global
      login(userSimulado); 
      
      toast.success(`Bem-vindo, ${userSimulado.fullName}!`);
      
      // 4. Pequeno delay para garantir que o estado foi salvo antes de mudar de página
      setTimeout(() => {
        navigate("/"); 
      }, 100);

    } catch (error) {
      toast.error("Erro ao realizar login. Tente novamente.");
      console.error(error);
    }
  };

  return (
    <main className="min-h-[80vh] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">Bem-vindo!</h1>
          <p className="text-gray-500 mt-2">Acesse sua conta para finalizar suas compras.</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="block text-sm font-bold text-gray-700">E-mail</label>
            <input 
              {...register("email")}
              type="email"
              placeholder="exemplo@email.com"
              className={`mt-1 w-full p-3 border rounded-xl outline-none transition-all ${errors.email ? 'border-red-500 focus:ring-1 focus:ring-red-200' : 'focus:border-blue-500 focus:ring-1 focus:ring-blue-100'}`}
            />
            {errors.email && <p className="text-red-500 text-xs mt-1 font-medium">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700">Senha</label>
            <input 
              {...register("password")}
              type="password"
              placeholder="••••••••"
              className={`mt-1 w-full p-3 border rounded-xl outline-none transition-all ${errors.password ? 'border-red-500 focus:ring-1 focus:ring-red-200' : 'focus:border-blue-500 focus:ring-1 focus:ring-blue-100'}`}
            />
            {errors.password && <p className="text-red-500 text-xs mt-1 font-medium">{errors.password.message}</p>}
          </div>

          <button 
            type="submit"
            className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 active:scale-95 transition-all shadow-lg shadow-blue-100"
          >
            Entrar na conta
          </button>
        </form>

        <p className="text-center mt-6 text-sm text-gray-500">
          Não tem uma conta?{" "}
          <Link to="/register" className="text-blue-600 font-bold hover:underline">
            Cadastre-se aqui
          </Link>
        </p>
      </div>
    </main>
  );
}