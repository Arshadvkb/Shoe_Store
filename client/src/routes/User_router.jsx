import { Route, Routes } from "react-router-dom";
import Home from "../pages/users/Home";
import ProductDetails from "../components/User/ProductDetails";
import Cart from "../pages/users/Cart";
import Wishlist from "../pages/users/Wishlist";
import CategoryProducts from "../pages/users/CategoryProducts";
import { AuthContextProvider } from "../providers/AuthContext_Provider";
import { ProductContextProvider } from "../providers/Productcontext_Provider";
import { CartContextProvider } from "../providers/CartContext_Provider";

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
              <Route path="/cart" element={<Cart />} />
              <Route path="/user/cart" element={<Cart />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/user/wishlist" element={<Wishlist />} />
              <Route path="/men" element={<CategoryProducts category="men" />} />
              <Route path="/women" element={<CategoryProducts category="women" />} />
              <Route path="/offers" element={<CategoryProducts category="offers" />} />
              <Route path="/category/:categoryName" element={<CategoryProducts />} />
            </Routes>
          </CartContextProvider>
        </ProductContextProvider>
      </AuthContextProvider>
    </div>
  );
};

export default User_router;
