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
    const loader = toast.loading("Conectando ao banco...");
    try {
      // Chamada real ao serviço que criamos acima
      const response = await authService.login(data.email, data.password);
      
      // O banco retorna User e Token
      login(response.user, response.token);
      
      toast.success(`Bem-vindo, ${response.user.fullName}!`, { id: loader });
      navigate("/");
    } catch (error) {
      // Tratamento de erro real (401, 404, 500)
      const message = error.response?.data?.message || "Erro ao acessar banco de dados";
      toast.error(message, { id: loader });
    }
  };

  return (
    <main className="min-h-[80vh] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <h1 className="text-3xl font-black text-gray-900">Login Real</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 mt-6">
          <div>
            <label className="block text-sm font-bold text-gray-700">E-mail</label>
            <input {...register("email")} className="mt-1 w-full p-3 border rounded-xl" />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700">Senha</label>
            <input {...register("password")} type="password" className="mt-1 w-full p-3 border rounded-xl" />
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold">
            Entrar
          </button>
        </form>
      </div>
    </main>
  );
}