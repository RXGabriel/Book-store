import { FiShoppingCart } from "react-icons/fi";
import { useParams } from "react-router-dom";
import { getImgUrl } from "../../utils/getImgUrl";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/features/cartSlice";
import { useFetchBookByIdQuery } from "../../redux/api/booksApi";
import Loading from "../../components/Loading";
import { useState } from "react";

const SingleBook = () => {
  const { id } = useParams();
  const { data: book, isLoading, isError } = useFetchBookByIdQuery(id);
  const dispatch = useDispatch();
  const [isHovered, setIsHovered] = useState(false);
  const [transformOrigin, setTransformOrigin] = useState("center center");

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleMouseMove = (e) => {
    const { offsetX, offsetY, target } = e.nativeEvent;
    const { offsetWidth, offsetHeight } = target;

    const xPercent = (offsetX / offsetWidth) * 100;
    const yPercent = (offsetY / offsetHeight) * 100;

    setTransformOrigin(`${xPercent}% ${yPercent}%`);
  };

  if (isLoading) return <Loading />;
  if (isError) return <div>Error ao buscar informações do livro</div>;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-gray-100 to-gray-300 p-6">
      <div className="w-full max-w-5xl bg-white shadow-xl rounded-lg p-8 space-y-6">
        <h1 className="text-3xl font-bold text-center text-gray-800">
          {book.title}
        </h1>

        <div className="flex flex-col md:flex-row gap-8 items-stretch">
          <div
            className="relative overflow-hidden rounded-lg w-full max-w-sm mx-auto shadow-md"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onMouseMove={handleMouseMove}
          >
            <img
              src={getImgUrl(book.coverImage)}
              alt={book.title}
              className="w-full h-full object-cover rounded-lg transition-transform duration-300"
              style={{
                transform: isHovered ? "scale(2)" : "scale(1)",
                transformOrigin: transformOrigin,
                transition: "transform 0.3s ease",
              }}
            />
          </div>

          <div className="flex-1 space-y-6 text-gray-700 flex flex-col justify-between">
            <div className="space-y-2">
              <p className="text-sm font-semibold text-gray-900">Autor</p>
              <p className="text-lg text-gray-600">{book.author || "admin"}</p>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-semibold text-gray-900">Categoria</p>
              <p className="text-lg text-gray-600 capitalize">
                {book?.category}
              </p>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-semibold text-gray-900">Descrição</p>
              <p className="text-lg text-gray-600">{book.description}</p>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-semibold text-gray-900">Páginas</p>
              <p className="text-lg text-gray-600">
                {book.pages || "Não informado"}
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={() => handleAddToCart(book)}
          className="btn-primary w-full px-6 py-5 flex items-center justify-center gap-1 space-x-1 transition duration-300 hover:shadow-lg"
        >
          <FiShoppingCart size={20} />
          <span>Adicionar ao Carrinho</span>
        </button>
      </div>
    </div>
  );
};

export default SingleBook;
