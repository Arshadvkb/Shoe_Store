import { useContext, useState } from "react";
import { AuthContext } from "../../context/Auth_Context";
import { CartContext } from "../../context/Cart_Context";
import { Link } from "react-router-dom";
import { Heart, Search, ShoppingCart, Menu, X } from "lucide-react";

const Navbar = () => {
  const { logout } = useContext(AuthContext);
  const cartCtx = useContext(CartContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const cartCount = cartCtx?.getCartCount ? cartCtx.getCartCount() : 0;
  const wishlistCount = cartCtx?.getWishlistCount ? cartCtx.getWishlistCount() : 0;

  return (
    <nav className="sticky top-0 z-50 w-full bg-tertiary shadow-md">
      <div className="flex h-[10vh] items-center justify-between px-5 md:px-10">
        <div className="font-extrabold text-2xl text-primary md:text-3xl">
          <Link to="/">Shoe Store</Link>
        </div>

        <div className="hidden items-center gap-6 md:flex font-semibold text-gray-700">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <Link to="/men" className="hover:text-primary transition-colors">Men</Link>
          <Link to="/women" className="hover:text-primary transition-colors">Women</Link>
          <Link to="/offers" className="hover:text-primary transition-colors">Offers</Link>
        </div>

        <div className="hidden h-10 items-center gap-2 rounded-xl border-2 border-black p-2 md:flex bg-white">
          <input
            type="text"
            placeholder="Search..."
            className="h-8 w-32 pl-2 outline-none md:w-40 bg-transparent text-sm"
          />

          <button aria-label="Search">
            <Search size={20} className="text-gray-600" />
          </button>
        </div>

        <div className="hidden items-center gap-4 md:flex">
          <Link
            to="/wishlist"
            className="relative p-2 rounded-xl hover:bg-secondary/50 transition-colors"
            title="Wishlist"
          >
            <Heart size={24} className="text-gray-800 hover:text-primary transition-colors" />
            {wishlistCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white shadow-sm">
                {wishlistCount}
              </span>
            )}
          </Link>

          <Link
            to="/cart"
            className="relative p-2 rounded-xl hover:bg-secondary/50 transition-colors"
            title="Shopping Cart"
          >
            <ShoppingCart size={24} className="text-gray-800 hover:text-primary transition-colors" />
            {cartCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-bold text-white shadow-sm">
                {cartCount}
              </span>
            )}
          </Link>
        </div>

        <button
          className="hidden h-10 w-20 rounded-2xl bg-primary text-white font-semibold shadow-md transition-all hover:bg-red-600 active:scale-95 md:block"
          onClick={logout}
        >
          Logout
        </button>

        <button
          className="md:hidden p-2 rounded-xl hover:bg-secondary/50"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle Menu"
        >
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {isMenuOpen && (
        <div className="flex flex-col gap-5 border-t border-black/10 bg-tertiary p-5 md:hidden font-semibold">
          <Link to="/" onClick={() => setIsMenuOpen(false)}>
            Home
          </Link>

          <Link to="/men" onClick={() => setIsMenuOpen(false)}>
            Men
          </Link>

          <Link to="/women" onClick={() => setIsMenuOpen(false)}>
            Women
          </Link>

          <Link to="/offers" onClick={() => setIsMenuOpen(false)}>
            Offers
          </Link>

          <div className="flex h-10 items-center gap-2 rounded-xl border-2 border-black p-2 bg-white">
            <input
              type="text"
              placeholder="Search..."
              className="h-8 w-full pl-2 outline-none text-sm"
            />

            <button aria-label="Search">
              <Search size={20} />
            </button>
          </div>

          <div className="flex items-center gap-5 pt-2">
            <Link
              to="/wishlist"
              onClick={() => setIsMenuOpen(false)}
              className="relative p-2 flex items-center gap-2"
            >
              <Heart size={24} />
              <span>Wishlist</span>
              {wishlistCount > 0 && (
                <span className="ml-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                  {wishlistCount}
                </span>
              )}
            </Link>

            <Link
              to="/cart"
              onClick={() => setIsMenuOpen(false)}
              className="relative p-2 flex items-center gap-2"
            >
              <ShoppingCart size={24} />
              <span>Cart</span>
              {cartCount > 0 && (
                <span className="ml-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>

          <button
            className="h-10 w-full rounded-2xl bg-primary text-white font-semibold shadow-md active:scale-95 mt-2"
            onClick={() => {
              setIsMenuOpen(false);
              logout();
            }}
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
