import { useContext } from "react";
import { AuthContext } from "../../context/Auth_Context";
import { Link } from "react-router-dom";
import { Heart, Search, ShoppingCart } from "lucide-react";
const Navbar = () => {
  const { logout } = useContext(AuthContext);

  return (
    <div className=" z-50 h-[10vh] min-w-screen bg-tertiary flex items-center justify-between px-5 ">
      <div className="font-extrabold text-3xl text-primary">
        <h1>Shoe Store</h1>
      </div>
      <div className="flex items-center gap-6 ">
        <Link>Home</Link>
        <Link>Men</Link>
        <Link>Women</Link>
        <Link>Offers</Link>
      </div>
      <div className="flex items-center gap-2 border-2 h-10 border-black rounded-xl p-2">
        <input
          type="text"
          placeholder="Search..."
          id="search"
          className=" h-10 pl-2 outline-none border-none"
        />
        <button>
          {" "}
          <Search />
        </button>
      </div>
      <div className="flex items-center gap-4">
        <Heart />
        <ShoppingCart />
      </div>
      <div>
        <button className="h-10 w-20 bg-primary rounded-2xl" onClick={logout}>
          logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
