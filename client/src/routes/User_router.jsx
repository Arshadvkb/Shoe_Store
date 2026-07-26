import { Route, Routes } from "react-router-dom";
import Home from "../pages/users/Home";
import { AuthContextProvider } from "../context/AuthContext_Provider";
import { ProductContextProvider } from "../context/Productcontext_Provider";

const User_router = () => {
  return (
    <div>
      <AuthContextProvider>
        <ProductContextProvider>
          <Routes>
            <Route path="/user/home" element={<Home />} />
          </Routes>
        </ProductContextProvider>
      </AuthContextProvider>
    </div>
  );
};

export default User_router;
