import { FiShoppingCart } from "react-icons/fi";
import { getImgUrl } from "../../utils/getImgUrl";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/features/cartSlice";

const BookCard = ({ book }) => {
  const dispatch = useDispatch();
  const discountPercentage = book?.oldPrice
    ? Math.round(((book.oldPrice - book.newPrice) / book.oldPrice) * 100)
    : 0;

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  return (
    <div className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 h-full flex flex-col">
      <div className="flex flex-col md:flex-row gap-4 p-4 flex-1">
        <div className="md:w-2/5 flex-shrink-0 relative overflow-hidden rounded-lg border-2 border-gray-200 aspect-[3/4] transform hover:scale-105 transition-transform duration-300 ease-in-out">
          <Link to={`/books/${book._id}`} className="block h-full">
            <img
              src={`${getImgUrl(book?.coverImage)}`}
              alt={`Capa do livro ${book.title}`}
              className="w-full h-full object-cover"
            />

            {discountPercentage > 0 && (
              <div className="absolute top-2 right-2 bg-[#FFEB00] text-gray-900 px-2 py-1 rounded-md text-xs font-bold shadow-lg z-10">
                {discountPercentage}% OFF
              </div>
            )}
          </Link>
        </div>

        <div className="md:w-3/5 flex flex-col justify-between flex-1">
          <div className="mb-3">
            <Link to={`/books/${book._id}`}>
              <h3 className="text-xl font-bold text-gray-800 hover:text-[#577BC1] line-clamp-2 mb-2 transition-colors duration-200">
                {book?.title}
              </h3>
            </Link>
            <p className="text-md text-gray-600">{book?.author}</p>
          </div>

          <p className="text-md text-gray-600 line-clamp-3 mb-4 flex-grow">
            {book?.description}
          </p>

          <div className="flex flex-row justify-between items-center gap-3">
            <span className="text-2xl font-bold text-[#577BC1]">
              R$ {book?.newPrice.toFixed(2)}
            </span>

            <button
              onClick={() => handleAddToCart(book)}
              className="bg-[#FFEB00] hover:bg-[#E6D400] text-gray-900 px-4 py-2 rounded-md
                       flex items-center gap-1.5 transition-all duration-200
                       border border-gray-900/10 font-semibold whitespace-nowrap
                       shadow-sm hover:shadow-md active:scale-95"
            >
              <FiShoppingCart className="text-lg" />
              <span className="text-md">Add</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
