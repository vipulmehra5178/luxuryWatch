import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useState } from "react";

function Navbar() {
  const { cartCount } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="text-2xl font-bold tracking-wide text-gray-900">
            LuxWatch
          </Link>

          <div className="hidden md:flex items-center gap-10">
            {[
              { name: "Home", to: "/" },
              { name: "Watches", to: "/watches" },
              { name: "About", to: "/About" },
            ].map((link, idx) => (
              <Link
                key={idx}
                to={link.to}
                className="text-gray-700 relative group font-medium"
              >
                {link.name}
                <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-blue-600 transition-all group-hover:w-full"></span>
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center">
            <Link
              to="/checkout"
              className="relative flex items-center justify-center w-12 h-12 rounded-full bg-blue-600 hover:bg-blue-700 transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.6 8H19m-6-8V6"
                />
              </svg>

              {cartCount > 0 && (
                <span className="absolute -top-3 -right-3 bg-blue-800 text-white text-sm font-semibold rounded-full px-3 py-1.5 shadow-lg transform transition-transform duration-300 scale-100 hover:scale-110">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>

          <button
            onClick={toggleMenu}
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-md hover:bg-gray-100"
          >
            {isMenuOpen ? (
              <svg
                className="w-6 h-6 text-gray-700"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg
                className="w-6 h-6 text-gray-700"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 8h16M4 16h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-md">
          <div className="flex flex-col gap-4 px-6 py-4">
            <Link to="/" className="text-gray-700 hover:text-blue-600" onClick={toggleMenu}>
              Home
            </Link>
            <Link to="/watches" className="text-gray-700 hover:text-blue-600" onClick={toggleMenu}>
              Watches
            </Link>
            <Link to="/About" className="text-gray-700 hover:text-blue-600" onClick={toggleMenu}>
              About
            </Link>
            <Link
              to="/checkout"
              className="cart-link"
            ><span className="cart-icon">🛒</span>
          <span className="cart-count">{cartCount}</span>
              </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;