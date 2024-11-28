import { FiShoppingCart } from "react-icons/fi";
import { useParams } from "react-router-dom";
import { getImgUrl } from "../../utils/getImgUrl";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/features/cartSlice";
import { useFetchBookByIdQuery } from "../../redux/api/booksApi";

const SingleBook = () => {
  const { id } = useParams();
  const { data: book, isLoading, isError } = useFetchBookByIdQuery(id);
  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  if (isLoading) return <div>Carregando...</div>;
  if (isError) return <div>Error ao buscar informações do livro</div>;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-4xl shadow-md p-12 bg-white rounded min-h-[600px] flex flex-col justify-between">
        <h1 className="text-3xl font-bold mb-6 text-center">{book.title}</h1>

        <div className="flex flex-col md:flex-row gap-8 flex-grow">
          <div className="flex-shrink-0 mt-8 md:mt-12">
            <img
              src={`${getImgUrl(book.coverImage)}`}
              alt={book.title}
              className="w-full max-w-sm mx-auto md:mx-0"
            />
          </div>

          <div className="flex-1 mt-8 md:mt-12">
            <p className="text-gray-700 mb-6">
              <strong>Autor:</strong> {book.author || "admin"}
            </p>
            <p className="text-gray-700 mb-6">
              <strong>Publicação:</strong>{" "}
              {new Date(book?.createdAt).toLocaleDateString()}
            </p>
            <p className="text-gray-700 mb-6 capitalize">
              <strong>Categoria:</strong> {book?.category}
            </p>
            <p className="text-gray-700 mb-6">
              <strong>Descrição:</strong> {book.description}
            </p>
          </div>
        </div>

        <button
          onClick={() => handleAddToCart(book)}
          className="btn-primary w-full px-6 py-5 flex items-center justify-center gap-1"
        >
          <FiShoppingCart />
          <span>Adicionar</span>
        </button>
      </div>
    </div>
  );
};

export default SingleBook;
