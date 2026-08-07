import Navbar from "../../components/Admin/Navbar";
import Sidebar from "../../components/Admin/Sidebar";


const Layout = ({ children }) => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Right Side */}
      <div className="flex-1 flex flex-col">
        <Navbar />

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-5 bg-gray-100">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
