import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";
import getBaseUrl from "../utils/baseURL";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [message, setMessage] = useState("");
  const { handleSubmit, register } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        `${getBaseUrl()}/api/auth/admin`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const auth = response.data;

      if (auth.token) {
        localStorage.setItem("token", auth.token);
        setTimeout(() => {
          localStorage.removeItem("token");
          Swal.fire({
            title: "Sessão Expirada",
            text: "Por favor, faça login novamente.",
            icon: "warning",
            confirmButtonText: "OK",
          });
          navigate("/");
        }, 3600 * 1000);

        Swal.fire({
          title: "Login Realizado",
          text: "Acesso efetuado com sucesso! Redirecionando...",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });

        navigate("/dashboard");
      }
    } catch (error) {
      console.error(error);
      setMessage("Forneça usuário e senha válidos");

      Swal.fire({
        title: "Erro de Login",
        text: "Forneça usuário e senha válidos.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="w-full max-w-sm mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-xl font-semibold mb-4">Login do Admin</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              User
            </label>
            <input
              {...register("username", { required: true })}
              type="text"
              name="username"
              id="username"
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

        <p className="mt-5 text-center text-gray-500 text-xs">
          ©2025 Bookstore. Todos os direitos reservados.
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
