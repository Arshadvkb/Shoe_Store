import { NavLink } from "react-router-dom";
import { Home, Users, Package } from "lucide-react";

const Sidebar = () => {
  return (
    <aside className="w-64 h-screen bg-secondary border-r border-gray-200 flex flex-col shadow-lg">
      {/* Logo */}
      <div className="h-16 flex items-center justify-center border-b border-gray-200">
        <div>
          <h1 className="text-2xl font-bold text-primary">Admin Dashboard</h1>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        <NavLink
          to="/admin/home"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
              isActive
                ? "bg-primary text-white shadow-md"
                : "hover:bg-white hover:shadow text-gray-700"
            }`
          }
        >
          <Home size={20} />
          <span>Dashboard</span>
        </NavLink>

        <NavLink
          to="/admin/view-users"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
              isActive
                ? "bg-primary text-white shadow-md"
                : "hover:bg-white hover:shadow text-gray-700"
            }`
          }
        >
          <Users size={20} />
          <span>Users</span>
        </NavLink>

        <NavLink
          to="/admin/view-products"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
              isActive
                ? "bg-primary text-white shadow-md"
                : "hover:bg-white hover:shadow text-gray-700"
            }`
          }
        >
          <Package size={20} />
          <span>Products</span>
        </NavLink>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200 text-center text-sm text-gray-500">
        © 2026 Shoe Store
      </div>
    </aside>
  );
};

export default Sidebar;
