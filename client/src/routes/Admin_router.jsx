import { Route, Routes } from "react-router-dom";
import Home from "../pages/admin/Home";
import View_Users from "../pages/admin/View_Users";
import View_Products from "../pages/admin/View_Products";
import { AuthContextProvider } from "../providers/AuthContext_Provider";
import { AdmincontextProvider } from "../providers/AdminContext-Provider";
const Admin_router = () => {
  return (
    <div>
      <AuthContextProvider>
        <AdmincontextProvider>
          <Routes>
            <Route path="/admin/home" element={<Home />} />
            <Route path="/admin/view-users" element={<View_Users />} />
            <Route path="/admin/view-products" element={<View_Products />} />
          </Routes>
        </AdmincontextProvider>
      </AuthContextProvider>
    </div>
  );
};

export default Admin_router;
