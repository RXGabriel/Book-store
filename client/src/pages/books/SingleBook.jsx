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
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 p-4 sm:p-6">
      <div className="w-full bg-white shadow-2xl rounded-xl p-4 md:p-8 space-y-6 md:space-y-8">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-[#344CB7] mb-4">
          {book.title}
        </h1>

        <div className="flex flex-col lg:flex-row gap-6 md:gap-8 items-stretch">
          <div
            className="relative overflow-hidden rounded-xl w-full max-w-md mx-auto shadow-lg border-2 border-[#344CB7]"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onMouseMove={handleMouseMove}
          >
            <img
              src={getImgUrl(book.coverImage)}
              alt={book.title}
              className="w-full h-full object-cover rounded-lg transition-transform duration-300"
              style={{
                transform: isHovered ? "scale(1.5)" : "scale(1)",
                transformOrigin: transformOrigin,
                transition: "transform 0.3s ease",
              }}
            />
          </div>

          <div className="flex-1 space-y-4 md:space-y-6 text-gray-800 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="space-y-1">
                <p className="text-sm md:text-base font-semibold text-[#344CB7]">
                  Autor
                </p>
                <p className="text-lg md:text-xl">{book.author || "admin"}</p>
              </div>

              <div className="space-y-1">
                <p className="text-sm md:text-base font-semibold text-[#344CB7]">
                  Categoria
                </p>
                <p className="text-lg md:text-xl capitalize">
                  {book?.category}
                </p>
              </div>

              <div className="space-y-1">
                <p className="text-sm md:text-base font-semibold text-[#344CB7]">
                  Sinopse
                </p>
                <p className="text-base md:text-lg leading-relaxed text-gray-600">
                  {book.description}
                </p>
              </div>

              <div className="space-y-1">
                <p className="text-sm md:text-base font-semibold text-[#344CB7]">
                  Páginas
                </p>
                <p className="text-lg md:text-xl">
                  {book.pages || "Não informado"}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-1">
                <p className="text-sm md:text-base font-semibold text-[#344CB7]">
                  Preço
                </p>
                <div className="flex items-center gap-3 flex-wrap">
                  {book?.oldPrice && (
                    <span className="text-gray-500 text-lg line-through">
                      R$ {book.oldPrice.toFixed(2)}
                    </span>
                  )}
                  <div className="flex items-center gap-4">
                    <span className="text-2xl md:text-3xl font-bold text-[#344CB7]">
                      R$ {book?.newPrice.toFixed(2)}
                    </span>
                    {book?.oldPrice && (
                      <span className="bg-[#FFEB00] text-[#344CB7] px-3 py-1 rounded-full text-sm font-bold">
                        Economize{" "}
                        {Math.round(
                          ((book.oldPrice - book.newPrice) / book.oldPrice) *
                            100
                        )}
                        %
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <button
                onClick={() => handleAddToCart(book)}
                className="w-full bg-[#FFEB00] hover:bg-[#E6D400] text-[#344CB7]
                         py-4 md:py-5 rounded-xl font-bold text-lg transition-all
                         shadow-md hover:shadow-lg flex items-center justify-center gap-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <span>Adicionar ao Carrinho</span>
              </button>
            </div>
          </div>
        </div>

        <div className="border-t-2 border-[#344CB7]/20 my-6 md:my-8"></div>

        <h2 className="text-2xl md:text-3xl font-bold text-[#344CB7] mb-6">
          Livros Recomendados
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          {recommendedBooks?.length > 0 ? (
            recommendedBooks.map((recommendedBook) => (
              <div
                key={recommendedBook._id}
                className="group bg-white rounded-xl shadow-md hover:shadow-xl
                         border-2 border-[#344CB7]/10 transition-all overflow-hidden"
              >
                <Link to={`/books/${recommendedBook._id}`}>
                  <div className="aspect-[3/4] relative overflow-hidden">
                    <img
                      src={getImgUrl(recommendedBook.coverImage)}
                      alt={recommendedBook.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-800 line-clamp-2">
                      {recommendedBook.title}
                    </h3>
                    <p className="text-[#577BC1] mt-2">
                      {recommendedBook.author}
                    </p>
                    <div className="flex justify-between items-center mt-4">
                      <p className="text-xl font-bold text-[#344CB7]">
                        R$ {recommendedBook.newPrice.toFixed(2)}
                      </p>
                      {recommendedBook.oldPrice && (
                        <span className="text-sm bg-[#FFEB00] text-[#344CB7] px-2 py-1 rounded-md">
                          -
                          {Math.round(
                            ((recommendedBook.oldPrice -
                              recommendedBook.newPrice) /
                              recommendedBook.oldPrice) *
                              100
                          )}
                          %
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              </div>
            ))
          ) : (
            <p className="text-[#577BC1] text-lg text-center col-span-full py-8">
              Nenhum livro recomendado encontrado.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleBook;
