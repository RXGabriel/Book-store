import { Link } from "react-router-dom";
import Loading from "../../components/Loading";
import { useEffect, useState } from "react";

const NotFound = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-100 to-gray-300">
      <h1
        className="text-[120px] font-Poppins mb-15 mt-15"
        style={{ color: "#212121" }}
      >
        404
      </h1>
      <p className="text-[18px] font-Poppins mb-6" style={{ color: "#616161" }}>
        Ops! A página que você está procurando não foi encontrada.
      </p>
      <Link
        to="/"
        className="px-6 py-3 bg-[#FFC107] text-white text-sm font-medium rounded-md shadow-md hover:bg-yellow-500 transition-colors"
      >
        Voltar para a página inicial
      </Link>
    </div>
  );
};

export default NotFound;
