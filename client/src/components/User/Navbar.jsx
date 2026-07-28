import { useContext, useState } from "react";
import { AuthContext } from "../../context/Auth_Context";
import { Link } from "react-router-dom";
import { Heart, Search, ShoppingCart, Menu, X } from "lucide-react";

const Navbar = () => {
  const { logout } = useContext(AuthContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className=" z-50 w-full bg-tertiary shadow-md">
      <div className="flex h-[10vh] items-center justify-between px-5 md:px-10">
        <div className="font-extrabold text-2xl text-primary md:text-3xl">
          <h1>Shoe Store</h1>
        </div>

        <div className="hidden items-center gap-6 md:flex">
          <Link to="/user/home">Home</Link>
          <Link to="/men">Men</Link>
          <Link to="/women">Women</Link>
          <Link to="/offers">Offers</Link>
        </div>

        <div className="hidden h-10 items-center gap-2 rounded-xl border-2 border-black p-2 md:flex">
          <input
            type="text"
            placeholder="Search..."
            className="h-8 w-32 pl-2 outline-none md:w-40"
          />

          <button>
            <Search size={20} />
          </button>
        </div>

        <div className="hidden items-center gap-4 md:flex">
          <button>
            <Heart />
          </button>

          <button>
            <ShoppingCart />
          </button>
        </div>

        <button
          className="hidden h-10 w-20 rounded-2xl bg-primary md:block"
          onClick={logout}
        >
          Logout
        </button>

        <button
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {isMenuOpen && (
        <div className="flex flex-col gap-5 border-t border-black/10 bg-tertiary p-5 md:hidden">
          <Link to="/user/home" onClick={() => setIsMenuOpen(false)}>
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

          <div className="flex h-10 items-center gap-2 rounded-xl border-2 border-black p-2">
            <input
              type="text"
              placeholder="Search..."
              className="h-8 w-full pl-2 outline-none"
            />

            <button>
              <Search size={20} />
            </button>
          </div>

          <div className="flex items-center gap-5">
            <button>
              <Heart />
            </button>

            <button>
              <ShoppingCart />
            </button>
          </div>

          <button
            className="h-10 w-full rounded-2xl bg-primary"
            onClick={logout}
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
