import { useContext, useState } from "react";
import { AuthContext } from "../../context/Auth_Context";
import { CartContext } from "../../context/Cart_Context";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Heart, Search, ShoppingCart, Menu, X, Tag } from "lucide-react";

const Navbar = () => {
  const { logout } = useContext(AuthContext);
  const cartCtx = useContext(CartContext);
  const navigate = useNavigate();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const cartCount = cartCtx?.getCartCount ? cartCtx.getCartCount() : 0;
  const wishlistCount = cartCtx?.getWishlistCount ? cartCtx.getWishlistCount() : 0;

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/men?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const navLinkStyle = ({ isActive }) =>
    `relative py-1 font-bold text-base transition-colors ${
      isActive
        ? "text-primary after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-primary"
        : "text-gray-700 hover:text-primary"
    }`;

  return (
    <nav className="sticky top-0 z-50 w-full bg-tertiary/95 backdrop-blur-md shadow-sm border-b border-black/5">
      <div className="flex h-[10vh] items-center justify-between px-5 md:px-10 max-w-7xl mx-auto">
        {/* Brand Logo */}
        <div className="font-extrabold text-2xl text-primary md:text-3xl tracking-tight">
          <Link to="/" className="flex items-center gap-2">
            <span>Shoe Store</span>
          </Link>
        </div>

        {/* Navigation Links */}
        <div className="hidden items-center gap-8 md:flex">
          <NavLink to="/" end className={navLinkStyle}>
            Home
          </NavLink>
          <NavLink to="/men" className={navLinkStyle}>
            Men
          </NavLink>
          <NavLink to="/women" className={navLinkStyle}>
            Women
          </NavLink>
          <NavLink to="/offers" className={navLinkStyle}>
            <span className="flex items-center gap-1">
              <Tag size={16} className="text-primary" />
              Offers
            </span>
          </NavLink>
        </div>

        {/* Search Bar */}
        <form
          onSubmit={handleSearchSubmit}
          className="hidden h-10 items-center gap-2 rounded-xl border-2 border-black/80 p-2 md:flex bg-white shadow-inner"
        >
          <input
            type="text"
            placeholder="Search shoes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-8 w-32 pl-2 outline-none md:w-44 bg-transparent text-sm font-medium"
          />
          <button type="submit" aria-label="Search" className="hover:text-primary transition-colors">
            <Search size={18} className="text-gray-700 hover:text-primary" />
          </button>
        </form>

        {/* Wishlist, Cart & Logout */}
        <div className="hidden items-center gap-3 md:flex">
          <Link
            to="/wishlist"
            className="relative p-2 rounded-xl hover:bg-secondary/60 transition-colors"
            title="Wishlist"
          >
            <Heart size={24} className="text-gray-800 hover:text-primary transition-colors" />
            {wishlistCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-extrabold text-white shadow-md">
                {wishlistCount}
              </span>
            )}
          </Link>

          <Link
            to="/cart"
            className="relative p-2 rounded-xl hover:bg-secondary/60 transition-colors"
            title="Shopping Cart"
          >
            <ShoppingCart size={24} className="text-gray-800 hover:text-primary transition-colors" />
            {cartCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-extrabold text-white shadow-md">
                {cartCount}
              </span>
            )}
          </Link>

          <button
            className="ml-2 h-10 px-5 rounded-2xl bg-primary text-white font-bold text-sm shadow-md transition-all hover:bg-red-600 active:scale-95"
            onClick={logout}
          >
            Logout
          </button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          className="md:hidden p-2 rounded-xl hover:bg-secondary/50"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle Menu"
        >
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {isMenuOpen && (
        <div className="flex flex-col gap-4 border-t border-black/10 bg-tertiary p-5 md:hidden font-bold">
          <NavLink
            to="/"
            end
            onClick={() => setIsMenuOpen(false)}
            className={({ isActive }) => (isActive ? "text-primary" : "text-gray-800")}
          >
            Home
          </NavLink>

          <NavLink
            to="/men"
            onClick={() => setIsMenuOpen(false)}
            className={({ isActive }) => (isActive ? "text-primary" : "text-gray-800")}
          >
            Men
          </NavLink>

          <NavLink
            to="/women"
            onClick={() => setIsMenuOpen(false)}
            className={({ isActive }) => (isActive ? "text-primary" : "text-gray-800")}
          >
            Women
          </NavLink>

          <NavLink
            to="/offers"
            onClick={() => setIsMenuOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-2 ${isActive ? "text-primary" : "text-gray-800"}`
            }
          >
            <Tag size={18} className="text-primary" />
            Offers
          </NavLink>

          <form
            onSubmit={(e) => {
              handleSearchSubmit(e);
              setIsMenuOpen(false);
            }}
            className="flex h-10 items-center gap-2 rounded-xl border-2 border-black p-2 bg-white mt-2"
          >
            <input
              type="text"
              placeholder="Search shoes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-8 w-full pl-2 outline-none text-sm"
            />
            <button type="submit" aria-label="Search">
              <Search size={20} />
            </button>
          </form>

          <div className="flex items-center justify-between gap-4 pt-3 border-t border-gray-200 mt-2">
            <Link
              to="/wishlist"
              onClick={() => setIsMenuOpen(false)}
              className="relative flex items-center gap-2 text-gray-800"
            >
              <Heart size={22} className="text-primary" />
              <span>Wishlist</span>
              {wishlistCount > 0 && (
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                  {wishlistCount}
                </span>
              )}
            </Link>

            <Link
              to="/cart"
              onClick={() => setIsMenuOpen(false)}
              className="relative flex items-center gap-2 text-gray-800"
            >
              <ShoppingCart size={22} className="text-primary" />
              <span>Cart</span>
              {cartCount > 0 && (
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>

          <button
            className="h-10 w-full rounded-2xl bg-primary text-white font-bold shadow-md active:scale-95 mt-3"
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
