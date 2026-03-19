import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

// Schema de Cadastro: Validação robusta de Engenharia
const registerSchema = yup.object({
  fullName: yup.string().min(3, "Nome muito curto").required("O nome é obrigatório"),
  email: yup.string().email("Digite um e-mail válido").required("O e-mail é obrigatório"),
  password: yup.string().min(6, "A senha deve ter pelo menos 6 dígitos").required("A senha é obrigatória"),
  confirmPassword: yup.string()
    .oneOf([yup.ref('password'), null], "As senhas não coincidem") // Valida se é igual à senha
    .required("A confirmação de senha é obrigatória"),
}).required();

export function Register() {
  const navigate = useNavigate();
  
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(registerSchema)
  });

  const onSubmit = (data) => {
    // Na vida real, aqui você enviaria um POST para /api/register do seu Django
    console.log("Dados para criação de conta:", data);
    
    // Simulação de sucesso
    toast.success("Conta criada com sucesso! Faça login.");
    navigate("/login"); // Após cadastrar, mandamos ele para o login
  };

  return (
    <main className="min-h-[85vh] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-black text-gray-900">Crie sua conta</h1>
          <p className="text-gray-500 mt-2">Rápido, fácil e seguro.</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Nome Completo */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Nome Completo</label>
            <input 
              {...register("fullName")}
              placeholder="Seu nome"
              className={`mt-1 w-full p-3 border rounded-xl outline-none transition-all ${errors.fullName ? 'border-red-500 focus:ring-1 focus:ring-red-200' : 'focus:border-blue-500 focus:ring-1 focus:ring-blue-100'}`}
            />
            <p className="text-red-500 text-[10px] mt-1 font-medium">{errors.fullName?.message}</p>
          </div>

          {/* E-mail */}
          <div>
            <label className="block text-sm font-medium text-gray-700">E-mail</label>
            <input 
              {...register("email")}
              type="email"
              placeholder="exemplo@email.com"
              className={`mt-1 w-full p-3 border rounded-xl outline-none transition-all ${errors.email ? 'border-red-500 focus:ring-1 focus:ring-red-200' : 'focus:border-blue-500 focus:ring-1 focus:ring-blue-100'}`}
            />
            <p className="text-red-500 text-[10px] mt-1 font-medium">{errors.email?.message}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Senha */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Senha</label>
              <input 
                {...register("password")}
                type="password"
                placeholder="••••••"
                className={`mt-1 w-full p-3 border rounded-xl outline-none transition-all ${errors.password ? 'border-red-500 focus:ring-1 focus:ring-red-200' : 'focus:border-blue-500 focus:ring-1 focus:ring-blue-100'}`}
              />
              <p className="text-red-500 text-[10px] mt-1 font-medium">{errors.password?.message}</p>
            </div>

            {/* Confirmar Senha */}
            <div>
              <label className="block text-sm font-medium text-gray-700">Confirmar</label>
              <input 
                {...register("confirmPassword")}
                type="password"
                placeholder="••••••"
                className={`mt-1 w-full p-3 border rounded-xl outline-none transition-all ${errors.confirmPassword ? 'border-red-500 focus:ring-1 focus:ring-red-200' : 'focus:border-blue-500 focus:ring-1 focus:ring-blue-100'}`}
              />
              <p className="text-red-500 text-[10px] mt-1 font-medium">{errors.confirmPassword?.message}</p>
            </div>
          </div>

          <button 
            type="submit"
            className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 active:scale-95 transition-all shadow-lg shadow-blue-100 mt-4"
          >
            Cadastrar agora
          </button>
        </form>

        <p className="text-center mt-6 text-sm text-gray-500">
          Já tem conta?{" "}
          <Link to="/login" className="text-blue-600 font-bold hover:underline">
            Faça login
          </Link>
        </p>
      </div>
    </main>
  );
}