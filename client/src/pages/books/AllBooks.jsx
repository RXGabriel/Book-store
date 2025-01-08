import { useState } from "react";
import { useFetchAllBooksQuery } from "../../redux/api/booksApi";
import { Link } from "react-router-dom";
import { getImgUrl } from "../../utils/getImgUrl";
import Loading from "../../components/Loading";

const categories = [
  "Todos",
  "Ficção",
  "Horror",
  "Infantil",
  "Tecnologia",
  "Negócios",
  "Mistério",
  "Fantasia",
  "Drama",
  "Filosofia",
  "Romance",
];

const AllBooks = () => {
  const { data: allBooks = [], isLoading, isError } = useFetchAllBooksQuery();
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const filteredBooks = allBooks.filter((book) => {
    const matchCategory =
      selectedCategory === "Todos" ||
      book.category?.toLowerCase() === selectedCategory.toLowerCase();
    const matchPrice =
      (!minPrice || book.newPrice >= parseFloat(minPrice)) &&
      (!maxPrice || book.newPrice <= parseFloat(maxPrice));
    return matchCategory && matchPrice;
  });

  if (isLoading) return <Loading />;
  if (isError) return <div>Erro ao buscar livros</div>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-300 p-6">
      <h1 className="text-4xl font-bold text-center mb-8">Todos os Livros</h1>

      <div className="mb-8 flex flex-wrap gap-4 items-center justify-between">
        <div className="flex items-center gap-2">
          <label
            htmlFor="category"
            className="text-sm font-medium text-gray-800"
          >
            Categoria:
          </label>
          <select
            id="category"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="border border-gray-300 rounded-md px-4 py-2 bg-white focus:outline-none"
          >
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-gray-800">
            Preço (R$):
          </label>
          <input
            type="number"
            placeholder="Mínimo"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="border border-gray-300 rounded-md px-4 py-2 bg-white focus:outline-none"
          />
          <span className="text-gray-600">-</span>
          <input
            type="number"
            placeholder="Máximo"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="border border-gray-300 rounded-md px-4 py-2 bg-white focus:outline-none"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book) => (
            <div
              key={book._id}
              className="bg-white shadow-md border rounded-lg overflow-hidden transition-transform transform hover:scale-105"
            >
              <Link to={`/books/${book._id}`}>
                <div className="w-full h-72">
                  <img
                    src={getImgUrl(book.coverImage)}
                    alt={book.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="p-4 flex flex-col">
                  <h3 className="text-lg font-semibold text-gray-800 line-clamp-2">
                    {book.title}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-1">
                    {book.author}
                  </p>
                  <p className="text-lg font-medium text-gray-800 mt-2">
                    R$ {book.newPrice.toFixed(2)}
                  </p>
                </div>
              </Link>
            </div>
          ))
        ) : (
          <p className="text-gray-500 col-span-full text-center">
            Nenhum livro encontrado.
          </p>
        )}
      </div>
    </div>
  );
};

export default AllBooks;
