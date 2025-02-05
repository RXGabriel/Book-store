import { Link, useLocation } from "react-router-dom";
import { HiOutlineHeart, HiOutlineShoppingCart } from "react-icons/hi2";
import { IoSearchOutline } from "react-icons/io5";
import { HiOutlineUser, HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import avatarImg from "../assets/avatar.png";
import logo from "../assets/icon.png";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useAuth } from "../context/AuthContext";
import { useSearchBooksQuery } from "../redux/api/booksApi";
import Swal from "sweetalert2";

const navigation = [{ name: "Carrinho", href: "/cart" }];

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [query, setQuery] = useState("");
  const { currentUser, logout } = useAuth();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const token = localStorage.getItem("token");
  const location = useLocation();

  const { data: books, isFetching } = useSearchBooksQuery(query, {
    skip: !query,
  });

  const handleLogOut = async () => {
    try {
      await logout();
      Swal.fire({
        title: "Sucesso!",
        text: "Você saiu da sua conta.",
        icon: "success",
        confirmButtonText: "OK",
      });
    } catch (error) {
      Swal.fire({
        title: "Erro!",
        text: "Ocorreu um erro ao sair da conta.",
        icon: "error",
        confirmButtonText: "Tentar novamente",
      });
    }
  };

  const handleSearchChange = (e) => {
    setQuery(e.target.value);
  };

  return (
    <header className="bg-white shadow-md">
      <nav className="max-w-screen-2xl mx-auto px-4 py-6 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="Logo" className="h-10" />{" "}
            <span className="text-xl md:text-2xl font-bold text-yellow-500">
              EasyBooks
            </span>
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-2 lg:gap-4 xl:gap-6">
          <Link
            to="/books"
            className="text-gray-700 hover:text-yellow-500 text-sm lg:text-base"
          >
            Livros
          </Link>
          <Link
            to="/about"
            className="text-gray-700 hover:text-yellow-500 text-sm lg:text-base"
          >
            Sobre Nós
          </Link>
          <Link
            to="/contact"
            className="text-gray-700 hover:text-yellow-500 text-sm lg:text-base"
          >
            Contato
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-2 lg:gap-4">
          {location.pathname === "/" && (
            <div className="relative">
              <IoSearchOutline className="absolute left-3 top-1/2 transform -translate-y-1/2 text-yellow-500 text-xl" />
              <input
                type="text"
                value={query}
                onChange={handleSearchChange}
                placeholder="Procure aqui"
                className="pl-10 pr-4 py-2 border rounded-md focus:outline-none"
              />
              {query && books && (
                <ul className="absolute bg-white border mt-1 w-full rounded shadow-lg z-10">
                  {isFetching && <li className="p-2">Buscando...</li>}
                  {!isFetching && books?.length === 0 && (
                    <li className="p-2">Nenhum livro encontrado</li>
                  )}
                  {!isFetching &&
                    books?.map((book) => (
                      <li key={book._id} className="p-2 hover:bg-gray-100">
                        <Link
                          to={`/books/${book._id}`}
                          onClick={() => setQuery("")}
                        >
                          {book.title}
                        </Link>
                      </li>
                    ))}
                </ul>
              )}
            </div>
          )}
          <Link
            to="/favorites"
            className="text-gray-700 hover:text-yellow-500 text-xl"
          >
            <HiOutlineHeart />
          </Link>
          <Link
            to="/cart"
            className="relative text-gray-700 hover:text-yellow-500 flex items-center text-xl"
          >
            <HiOutlineShoppingCart />
            {cartItems.length > 0 && (
              <span className="ml-1 text-xs text-red-500">
                {cartItems.length}
              </span>
            )}
          </Link>
          {currentUser ? (
            <div className="relative">
              <button onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                <img
                  src={avatarImg}
                  alt="avatar"
                  className="h-8 w-8 rounded-full"
                />
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md z-40">
                  <ul className="py-2">
                    {navigation.map((item) => (
                      <li
                        key={item.name}
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        <Link
                          to={item.href}
                          className="block px-4 py-2 text-sm hover:bg-gray-100"
                        >
                          {item.name}
                        </Link>
                      </li>
                    ))}
                    <li>
                      <button
                        onClick={handleLogOut}
                        className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                      >
                        Sair da conta
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          ) : token ? (
            <Link
              to="/dashboard"
              className="text-gray-700 hover:text-yellow-500"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Dashboard
            </Link>
          ) : (
            <Link
              to="/login"
              className="text-gray-700 hover:text-yellow-500 text-xl"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <HiOutlineUser />
            </Link>
          )}
        </div>

        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-gray-700 hover:text-yellow-500 text-2xl"
          >
            {isMobileMenuOpen ? <HiOutlineX /> : <HiOutlineMenu />}
          </button>
        </div>
      </nav>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-md">
          <div className="flex flex-col items-center gap-4 py-4">
            <Link
              to="/books"
              className="text-gray-700 hover:text-yellow-500"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Livros
            </Link>
            <Link
              to="/about"
              className="text-gray-700 hover:text-yellow-500"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Sobre Nós
            </Link>
            <Link
              to="/contact"
              className="text-gray-700 hover:text-yellow-500"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contato
            </Link>
            {location.pathname === "/" && (
              <div className="relative w-full px-4">
                <IoSearchOutline className="absolute left-6 top-1/2 transform -translate-y-1/2 text-yellow-500 text-xl" />
                <input
                  type="text"
                  value={query}
                  onChange={handleSearchChange}
                  placeholder="Procure aqui"
                  className="pl-10 pr-4 py-2 border rounded-md focus:outline-none w-full"
                />
                {query && books && (
                  <ul className="absolute bg-white border mt-1 w-full rounded shadow-lg z-10">
                    {isFetching && <li className="p-2">Buscando...</li>}
                    {!isFetching && books?.length === 0 && (
                      <li className="p-2">Nenhum livro encontrado</li>
                    )}
                    {!isFetching &&
                      books?.map((book) => (
                        <li key={book._id} className="p-2 hover:bg-gray-100">
                          <Link
                            to={`/books/${book._id}`}
                            onClick={() => {
                              setQuery("");
                              setIsMobileMenuOpen(false);
                            }}
                          >
                            {book.title}
                          </Link>
                        </li>
                      ))}
                  </ul>
                )}
              </div>
            )}
          </div>
          <div className="flex justify-around w-full py-4 border-t">
            <Link
              to="/favorites"
              className="text-gray-700 hover:text-yellow-500 text-xl"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <HiOutlineHeart />
            </Link>
            <Link
              to="/cart"
              className="relative text-gray-700 hover:text-yellow-500 flex items-center text-xl"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <HiOutlineShoppingCart />
              {cartItems.length > 0 && (
                <span className="ml-1 text-xs text-red-500">
                  {cartItems.length}
                </span>
              )}
            </Link>
            {currentUser ? (
              <button onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                <img
                  src={avatarImg}
                  alt="avatar"
                  className="h-8 w-8 rounded-full"
                />
              </button>
            ) : token ? (
              <Link
                to="/dashboard"
                className="text-gray-700 hover:text-yellow-500"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Dashboard
              </Link>
            ) : (
              <Link
                to="/login"
                className="text-gray-700 hover:text-yellow-500 text-xl"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <HiOutlineUser />
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
