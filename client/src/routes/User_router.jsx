import { Route, Routes } from "react-router-dom";
import Home from "../pages/users/Home";
import { AuthContextProvider } from "../context/AuthContext_Provider";

const User_router = () => {
  return (
    <div>
      <AuthContextProvider>
      <Routes>
        <Route path="/user/home" element={<Home />} />
      </Routes>
      </AuthContextProvider>
    </div>
  );
};

export default User_router;
