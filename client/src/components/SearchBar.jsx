import { useState } from "react";
import { Link } from "react-router-dom";
import { useSearchBooksQuery } from "../redux/api/booksApi";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const { data: books, isFetching } = useSearchBooksQuery(query, {
    skip: !query,
  });

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  return (
    <div className="relative">
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Buscar livros..."
        className="px-4 py-2 border rounded w-64"
      />
      {query && (
        <ul className="absolute bg-white border mt-1 w-full rounded shadow-lg z-10">
          {isFetching && <li className="p-2">Buscando...</li>}
          {!isFetching && books?.length === 0 && (
            <li className="p-2">Nenhum livro encontrado</li>
          )}
          {!isFetching &&
            books?.map((book) => (
              <li key={book._id} className="p-2 hover:bg-gray-100">
                <Link to={`/books/${book._id}`} onClick={() => setQuery("")}>
                  {book.title}
                </Link>
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
