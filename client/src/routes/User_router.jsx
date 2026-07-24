import { Route, Routes } from "react-router-dom";
import Home from "../pages/users/Home";

const User_router = () => {
  return (
    <div>
      <Routes>
        <Route path="/user/home" element={<Home />} />
      </Routes>
    </div>
  );
};

export default User_router;
