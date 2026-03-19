import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../store/AuthContext";

const loginSchema = yup.object({
  email: yup.string().email("E-mail inválido").required("O e-mail é obrigatório"),
  password: yup.string().min(6, "Senha curta demais").required("A senha é obrigatória"),
}).required();

export function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(loginSchema)
  });

  const onSubmit = async (data) => {
    const loader = toast.loading("Autenticando...");

    try {
      // SIMULAÇÃO DE CHAMADA DE API (Substitua pela sua URL do Django/Node depois)
      // const response = await fetch("http://localhost:8000/api/login/", { ... });
      
      // Simulando um atraso de rede de 1.5s
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Simulando o objeto que viria do seu PostgreSQL
      const mockResponse = {
        user: {
          fullName: "Sivaldo Developer",
          email: data.email,
          avatar: "https://github.com/github.png"
        },
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." // Token Fake
      };

      // Chama o login do contexto passando os dados Reais/Simulados
      login(mockResponse.user, mockResponse.token);
      
      toast.success("Login realizado!", { id: loader });
      navigate("/");

    } catch (error) {
      toast.error("Falha na conexão com o servidor.", { id: loader });
      console.error(error);
    }
  };

  return (
    <main className="min-h-[80vh] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <h1 className="text-3xl font-black text-gray-900 mb-2">Login Real</h1>
        <p className="text-gray-500 mb-8">Conectando ao banco de dados.</p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="block text-sm font-bold text-gray-700">E-mail</label>
            <input 
              {...register("email")}
              type="email"
              className={`mt-1 w-full p-3 border rounded-xl outline-none transition-all ${errors.email ? 'border-red-500' : 'focus:border-blue-500'}`}
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700">Senha</label>
            <input 
              {...register("password")}
              type="password"
              className={`mt-1 w-full p-3 border rounded-xl outline-none transition-all ${errors.password ? 'border-red-500' : 'focus:border-blue-500'}`}
            />
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
          </div>

          <button type="submit" className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 transition-all">
            Acessar Sistema
          </button>
        </form>

        <p className="text-center mt-6 text-sm text-gray-500">
          Novo por aqui? <Link to="/register" className="text-blue-600 font-bold underline">Criar conta</Link>
        </p>
      </div>
    </main>
  );
}