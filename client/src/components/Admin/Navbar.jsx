import { Bell, Search, UserCircle2, LogOut } from "lucide-react";
import { useContext } from "react";
import { AuthContext } from "../../context/Auth_Context";

const Navbar = () => {
    const {logout}=useContext(AuthContext)
  return (
    <nav className="h-16 w-full bg-secondary border-b border-gray-200 shadow-sm flex items-center justify-between px-6">
      {/* Left */}
    

      {/* Center */}
      <div className="hidden md:flex items-center bg-white rounded-lg px-3 py-2 w-96 shadow-sm">
        <Search size={18} className="text-gray-500" />
        <input
          type="text"
          placeholder="Search..."
          className="ml-2 w-full outline-none bg-transparent"
        />
      </div>

      {/* Right */}
      <div className="flex items-center gap-5">
        <button className="relative hover:text-primary transition">
          <Bell size={22} />
          <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-red-500"></span>
        </button>

        <div className="flex items-center gap-2 cursor-pointer">
          <UserCircle2 size={34} className="text-primary" />
          <div className="hidden md:block">
            <p className="font-semibold">Admin</p>
            <p className="text-xs text-gray-500">Administrator</p>
          </div>
        </div>

        <button 
        onClick={logout}
        className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:opacity-90 transition">
          <LogOut size={18} />
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
