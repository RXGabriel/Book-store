import { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import Swal from "sweetalert2";

const Login = () => {
  const [message, setMessage] = useState("");
  const { handleSubmit, register } = useForm();
  const { loginUser, signInWithGoogle } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      await loginUser(data.email, data.password);
      Swal.fire({
        icon: "success",
        title: "Login efetuado com sucesso",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/");
    } catch (error) {
      setMessage("Forneça e-mail e senha válidos");
      Swal.fire({
        icon: "error",
        title: "Erro no login",
        text: "E-mail ou senha inválidos",
        confirmButtonText: "Tentar novamente",
      });
      console.error(error);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      Swal.fire({
        icon: "success",
        title: "Login efetuado com sucesso",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Login falhou",
        text: "Tente novamente mais tarde",
        confirmButtonText: "OK",
      });
      console.error(error);
    }
  };

  return (
    <div className="h-[calc(100vh-120px)] flex justify-center items-center">
      <div className="w-full max-w-sm mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-xl font-semibold mb-4">Login</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              E-mail
            </label>
            <input
              {...register("email", { required: true })}
              type="email"
              name="email"
              id="email"
              placeholder="Digite seu e-mail"
              className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Senha
            </label>
            <input
              {...register("password", { required: true })}
              type="password"
              name="password"
              id="password"
              placeholder="Digite sua senha"
              className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow"
            />
          </div>

          {message && (
            <p className="text-red-500 text-xs italic mb-3">{message}</p>
          )}

          <div>
            <button className="w-full bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-8 rounded focus:outline-none">
              Login
            </button>
          </div>
        </form>

        <div className="flex items-center my-4">
          <div className="h-px flex-grow bg-gray-300"></div>
          <span className="px-4 text-gray-500 text-sm">ou</span>
          <div className="h-px flex-grow bg-gray-300"></div>
        </div>

        <div className="mt-4">
          <button
            onClick={handleGoogleSignIn}
            className="w-full flex flex-wrap gap-1 items-center justify-center bg-secondary hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none"
          >
            <FaGoogle className="mr-2" />
            Login com Google
          </button>
        </div>

        <p className="align-baseline font-medium mt-4 text-sm">
          Não tem uma conta?
          <Link
            to="/register"
            className="text-blue-500 hover:text-blue-700 ml-2"
          >
            Criar conta
          </Link>
        </p>

        <p className="mt-5 text-center text-gray-500 text-xs">
          ©2025 Bookstore. Todos os direitos reservados.
        </p>
      </div>
    </div>
  );
};

export default Login;
