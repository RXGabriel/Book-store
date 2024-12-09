import { Link, useLocation } from "react-router-dom";
import { HiOutlineHeart, HiOutlineShoppingCart } from "react-icons/hi2";
import { IoSearchOutline } from "react-icons/io5";
import { HiOutlineUser } from "react-icons/hi";
import { IoHomeOutline } from "react-icons/io5";
import avatarImg from "../assets/avatar.png";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useAuth } from "../context/AuthContext";
import { useSearchBooksQuery } from "../redux/api/booksApi";

const navigation = [
  { name: "Pedidos", href: "/orders" },
  { name: "Carrinho", href: "/cart" },
  { name: "Check-Out", href: "/checkout" },
];

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [query, setQuery] = useState("");
  const { currentUser, logout } = useAuth();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const token = localStorage.getItem("token");
  const location = useLocation();

  const { data: books, isFetching } = useSearchBooksQuery(query, {
    skip: !query,
  });

  const handleLogOut = () => {
    logout();
  };

  const handleSearchChange = (e) => {
    setQuery(e.target.value);
  };

  return (
    <header className="max-w-screen-2xl mx-auto px-4 py-6">
      <nav className="flex justify-between items-center">
        <div className="flex items-center md:gap-16 gap-4">
          {location.pathname !== "/" && (
            <Link to="/">
              <IoHomeOutline className="size-5" />
            </Link>
          )}

          {location.pathname === "/" && (
            <div className="relative sm:w-72 w-40 space-x-2">
              <IoSearchOutline className="absolute inline-block left-3 inset-y-2" />
              <input
                type="text"
                value={query}
                onChange={handleSearchChange}
                placeholder="Procure aqui"
                className="bg-[#EAEAEA] w-full py-1 md:px-8 px-6 rounded-md focus:outline-none"
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
        </div>

        <div className="relative flex items-center md:space-x-3 space-x-2">
          <div>
            {currentUser ? (
              <>
                <button onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                  <img
                    src={avatarImg}
                    alt="avatar"
                    className={`size-7 rounded-full ${
                      currentUser ? "ring-2 ring-blue-500" : ""
                    }`}
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
              </>
            ) : token ? (
              <Link to="/dashboard" className="border-b-2 border-primary">
                Dashboard
              </Link>
            ) : (
              <Link to="/login">
                <HiOutlineUser className="size-6" />
              </Link>
            )}
          </div>

          <button className="hidden sm:block">
            <HiOutlineHeart className="size-6" />
          </button>

          <Link
            to="/cart"
            className="bg-primary p-1 sm:px-6 px-2 flex items-center rounded-sm"
          >
            <HiOutlineShoppingCart className="" />
            {cartItems.length > 0 ? (
              <span className="text-sm font-semibold sm:ml-1">
                {cartItems.length}
              </span>
            ) : (
              <span className="text-sm font-semibold sm:ml-1">0</span>
            )}
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
