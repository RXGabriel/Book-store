import { Link, useParams } from "react-router-dom";
import { getImgUrl } from "../../utils/getImgUrl";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/features/cartSlice";
import {
  useFetchBookByIdQuery,
  useFetchAllBooksQuery,
} from "../../redux/api/booksApi";
import Loading from "../../components/Loading";
import { useState, useEffect } from "react";

const SingleBook = () => {
  const { id } = useParams();
  const { data: book, isLoading, isError } = useFetchBookByIdQuery(id);
  const { data: allBooks, isLoading: isAllBooksLoading } =
    useFetchAllBooksQuery();

  const dispatch = useDispatch();
  const [recommendedBooks, setRecommendedBooks] = useState([]);
  const [isHovered, setIsHovered] = useState(false);
  const [transformOrigin, setTransformOrigin] = useState("center center");

  useEffect(() => {
    if (book && allBooks) {
      const recommendedBooksSet = new Set();

      const recommendedByAuthor = allBooks.filter(
        (b) => b.author === book.author && b._id !== book._id
      );

      recommendedByAuthor.forEach((b) => recommendedBooksSet.add(b._id));

      const recommendedByCategory = allBooks.filter(
        (b) =>
          b.category === book.category &&
          b._id !== book._id &&
          !recommendedBooksSet.has(b._id)
      );

      const shuffle = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
        }
      };
      shuffle(recommendedByCategory);

      const recommendedCategoryRandom = recommendedByCategory.slice(0, 3);

      const combinedRecommendations = [
        ...recommendedByAuthor,
        ...recommendedCategoryRandom,
      ];

      setRecommendedBooks(combinedRecommendations);
    }
  }, [book, allBooks]);

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

  if (isLoading || isAllBooksLoading) return <Loading />;
  if (isError) return <div>Error ao buscar informações do livro</div>;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-gray-100 to-gray-300 p-6">
      <div className="w-full bg-white shadow-xl rounded-lg p-8 space-y-6">
        <h1 className="text-3xl font-bold text-center text-gray-800">
          {book.title}
        </h1>

        <div className="flex flex-col md:flex-row gap-6 items-stretch">
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

          <div className="flex-1 space-y-4 text-gray-700 flex flex-col justify-between">
            <div className="space-y-1">
              <p className="text-sm font-semibold text-gray-900">Autor</p>
              <p className="text-lg text-gray-600">{book.author || "admin"}</p>
            </div>

            <div className="space-y-1">
              <p className="text-sm font-semibold text-gray-900">Categoria</p>
              <p className="text-lg text-gray-600 capitalize">
                {book?.category}
              </p>
            </div>

            <div className="space-y-1">
              <p className="text-sm font-semibold text-gray-900">Sinopse</p>
              <p className="text-lg text-gray-600">{book.description}</p>
            </div>

            <div className="space-y-1">
              <p className="text-sm font-semibold text-gray-900">Páginas</p>
              <p className="text-lg text-gray-600">
                {book.pages || "Não informado"}
              </p>
            </div>

            <div className="space-y-1">
              <p className="text-sm font-semibold text-gray-900">Preço</p>
              <div className="flex items-center gap-3">
                {book?.oldPrice && (
                  <span className="text-gray-500 text-sm line-through">
                    R$ {book.oldPrice.toFixed(2)}
                  </span>
                )}
                <span className="text-xl font-bold text-gray-800">
                  R$ {book?.newPrice.toFixed(2)}
                </span>
                {book?.oldPrice && (
                  <span className="bg-yellow-400 text-black text-xs font-bold py-1 px-2 rounded">
                    -
                    {Math.round(
                      ((book.oldPrice - book.newPrice) / book.oldPrice) * 100
                    )}
                    %
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={() => handleAddToCart(book)}
          className="btn-primary w-full px-6 py-5 flex items-center justify-center gap-2 transition duration-300 hover:shadow-lg"
        >
          <span>Adicionar ao Carrinho</span>
        </button>

        <div className="border-t-2 border-gray-300 my-8"></div>

        <h2 className="text-2xl font-semibold mb-6">Livros Recomendados</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {recommendedBooks?.length > 0 ? (
            recommendedBooks.map((recommendedBook) => (
              <div
                key={recommendedBook._id}
                className="w-full max-w-sm bg-white shadow-md border rounded-lg"
              >
                <Link to={`/books/${recommendedBook._id}`}>
                  <img
                    src={getImgUrl(recommendedBook.coverImage)}
                    alt={recommendedBook.title}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <div className="p-2">
                    <h3 className="text-sm font-semibold text-gray-800">
                      {recommendedBook.title}
                    </h3>
                    <p className="text-xs text-gray-600">
                      {recommendedBook.author}
                    </p>
                    <p className="text-sm font-medium text-gray-800 mt-2">
                      R$ {recommendedBook.newPrice.toFixed(2)}
                    </p>
                  </div>
                </Link>
              </div>
            ))
          ) : (
            <p className="text-gray-500">
              Nenhum livro recomendado encontrado.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleBook;
