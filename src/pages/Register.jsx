import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { authService } from "../services/authService";

export function Register() {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    try {
      await authService.register(data);
      toast.success("Conta criada no banco de dados!");
      navigate("/login");
    } catch (error) {
      toast.error("Erro ao cadastrar usuário.");
    }
  };

  return (
    <main className="min-h-[80vh] flex items-center justify-center">
      <form onSubmit={handleSubmit(onSubmit)} className="p-8 bg-white rounded-xl shadow-sm border max-w-sm w-full space-y-4">
        <h2 className="text-2xl font-bold">Criar Conta Real</h2>
        <input {...register("fullName")} placeholder="Nome" className="w-full p-3 border rounded-lg" />
        <input {...register("email")} placeholder="E-mail" className="w-full p-3 border rounded-lg" />
        <input {...register("password")} type="password" placeholder="Senha" className="w-full p-3 border rounded-lg" />
        <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold">Cadastrar</button>
      </form>
    </main>
  );
}