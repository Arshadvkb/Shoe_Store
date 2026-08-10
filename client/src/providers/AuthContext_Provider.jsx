import { useReducer } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {AuthContext} from "../context/Auth_Context"
const initialState = {
  name: "",
  username: "",
  email: "",
  password: "",
  role: "",
  cart: [],
  wishlist: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        ...action.payload.userData,
      };
    case "REGISTER":
      return {
        ...state,
        ...action.payload.userData,
      };
    default:
      return state;
  }
};

export const AuthContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const navigate = useNavigate();

  const register = async (userData) => {
    try {
      const response = await axios.get("http://localhost:5000/users");

      const users = response.data;

      const existingUser = users.find(
        (data) =>
          data.username === userData.username || data.email === userData.email,
      );

      if (existingUser) {
        alert("User with this email or username already exists");
        return;
      }

      const newUser = await axios.post(`http://localhost:5000/users`, userData);
      console.log(newUser);
      navigate("/");
    } catch (e) {
      console.log(e.message);
    }
  };
  const login = async (userData) => {
    try {
      const response = await axios.get("http://localhost:5000/users");
      const Users = response.data;

      console.log(Users);
      const existingUser = Users.find(
        (data) =>
          userData.email === data.email && userData.password === data.password,
      );
      if (!existingUser) {
        alert("Invalid email or password");
        return 0;
      }

      sessionStorage.setItem("Active User", JSON.stringify(existingUser));

      if (existingUser.role === "admin") {
        alert("Admin login");
        navigate("/admin/home");
      } else if (existingUser.role === "user") {
        alert("user login");
        navigate("/");
      } else {
        alert("No user found");
        sessionStorage.removeItem("Active User");
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  const logout=()=>{
    console.log("logout clicked");
      sessionStorage.removeItem("Active User");
      navigate("/login")
    
  }

  const values = {
    state,
    dispatch,
    login,
    register,
    logout,
  };

  return (
    <AuthContext.Provider value={values}>{props.children}</AuthContext.Provider>
  );
};
