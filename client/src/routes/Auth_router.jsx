import { Route, Routes } from "react-router-dom";
import Login from "../pages/auth/Login";
import { AuthContextProvider } from "../providers/AuthContext_Provider";
import Register from "../pages/auth/Register";


const Auth_router = () => {
  return (
    <div>
      <AuthContextProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </AuthContextProvider>
    </div>
  );
};

export default Auth_router;
