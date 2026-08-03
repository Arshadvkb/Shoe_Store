import { Route, Routes } from "react-router-dom";
import Home from "../pages/users/Home";
import { AuthContextProvider } from "../context/AuthContext_Provider";
import { ProductContextProvider } from "../context/Productcontext_Provider";
import ProductDetails from "../components/User/ProductDetails";
import { CartContextProvider } from "../context/CartContext_Provider";

const User_router = () => {
  return (
    <div>
      <AuthContextProvider>
        <ProductContextProvider>
          <CartContextProvider>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route
                path="/user/product/details/:id"
                element={<ProductDetails />}
              />
            </Routes>
          </CartContextProvider>
        </ProductContextProvider>
      </AuthContextProvider>
    </div>
  );
};

export default User_router;
