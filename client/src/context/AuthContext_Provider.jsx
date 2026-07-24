import { useReducer } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "./Auth_Context";

const initialState = {
  name: "",
  username: "",
  email: "",
  password: "",
  role: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        ...action.payload,
      };
    case "REGISTER":
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export const AuthContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const navigate = useNavigate();

  const login = async () => {
    try {
      const response = await axios.get("http://localhost:5000/users");
      // console.log(state);
      const rdata = response.data;
      console.log(rdata);

      rdata.map((data) => {
        if (
          state.username === data.username &&
          state.password === data.password
        ) {
          console.log("no user found in db");

          if (data.role === "admin") {
            console.log("found admin");
            navigate("/admin/home");
          } else if (data.role === "user") {
            console.log("found user");
            navigate("/user/home");
          } else {
            console.log("no user found");
          }
        } else {
          console.log("Wrong password or username");
        }
      });
    } catch (e) {
      console.log(e.message);
    }
  };

  const register = async () => {
    try {
      const response = await axios.get("http://localhost:5000/users");

      const users = response.data;

      const existingUser = users.find(
        (data) =>
          data.username === state.username || data.email === state.email,
      );

      if (existingUser) {
        alert("User with this email or username already exists");
        return;
      }

      const newUser = await axios.post(`http://localhost:5000/users`,state);
      console.log(newUser);
      
    } catch (e) {
      console.log(e.message);
    }
  };

  const values = {
    state,
    dispatch,
    login,
    register,
  };

  return (
    <AuthContext.Provider value={values}>{props.children}</AuthContext.Provider>
  );
};
