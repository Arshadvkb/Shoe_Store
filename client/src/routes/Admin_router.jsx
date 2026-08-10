import { Route, Routes } from "react-router-dom";
import Home from "../pages/admin/Home";
import View_Users from "../pages/admin/View_Users";
import View_Products from "../pages/admin/View_Products";
import { AuthContextProvider } from "../providers/AuthContext_Provider";
import { AdmincontextProvider } from "../providers/AdminContext-Provider";
import AddProduct from "../pages/admin/AddProduct";
import ProtectdRout from "../utils/ProtectdRout";
import BlockedUsers from "../pages/admin/BlockedUsers";

const Admin_router = () => {
  return (
    <div>
      <AuthContextProvider>
        <AdmincontextProvider>
          <Routes>
            <Route element={<ProtectdRout allowedRole="admin" />}>
              <Route path="/admin/home" element={<Home />} />
              <Route path="/admin/view-users" element={<View_Users />} />
              <Route path="/admin/view-products" element={<View_Products />} />
              <Route path="/admin/add-product" element={<AddProduct />} />
              <Route path="/blocked" element={<BlockedUsers/>} />
            </Route>
          </Routes>
        </AdmincontextProvider>
      </AuthContextProvider>
    </div>
  );
};

export default Admin_router;
