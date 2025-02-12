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
  const [searchTerm, setSearchTerm] = useState("");

  const filteredBooks = allBooks.filter((book) => {
    const matchCategory =
      selectedCategory === "Todos" ||
      book.category?.toLowerCase() === selectedCategory.toLowerCase();
    const matchPrice =
      (!minPrice || book.newPrice >= parseFloat(minPrice)) &&
      (!maxPrice || book.newPrice <= parseFloat(maxPrice));
    const matchSearchTerm =
      !searchTerm ||
      book.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchCategory && matchPrice && matchSearchTerm;
  });

  if (isLoading) return <Loading />;
  if (isError) return <div>Erro ao buscar livros</div>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-8 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-3">
            Todos os Livros
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">
            Explore nossa coleção completa de livros. Filtre por categoria,
            preço ou pesquise por títulos específicos.
          </p>
        </div>

        <div className="mb-8 bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Categoria
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#577BC1] focus:border-[#577BC1] transition-all"
              >
                {categories.map((category, index) => (
                  <option key={index} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Faixa de Preço
              </label>
              <div className="flex gap-3">
                <input
                  type="number"
                  placeholder="Mínimo"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#577BC1] focus:border-[#577BC1] transition-all"
                />
                <input
                  type="number"
                  placeholder="Máximo"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#577BC1] focus:border-[#577BC1] transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Pesquisar
              </label>
              <input
                type="text"
                placeholder="Digite o título..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#577BC1] focus:border-[#577BC1] transition-all"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
          {filteredBooks.length > 0 ? (
            filteredBooks.map((book) => (
              <div
                key={book._id}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden group"
              >
                <Link to={`/books/${book._id}`} className="block h-full">
                  <div className="aspect-[2/3] relative overflow-hidden">
                    <img
                      src={getImgUrl(book.coverImage)}
                      alt={book.title}
                      className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>

                  <div className="p-3">
                    <h3 className="text-sm font-semibold text-gray-800 line-clamp-2 mb-1 group-hover:text-[#577BC1] transition-colors">
                      {book.title}
                    </h3>
                    <p className="text-xs text-gray-500 line-clamp-1 mb-2">
                      {book.author}
                    </p>
                    <p className="text-base font-bold text-[#577BC1]">
                      R$ {book.newPrice.toFixed(2)}
                    </p>
                  </div>
                </Link>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-10">
              <p className="text-gray-500">Nenhum livro encontrado.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllBooks;
