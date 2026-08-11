import axios from "axios";
import { Admincontext } from "../context/Admin_conext";
import { useReducer } from "react";
import { useNavigate } from "react-router-dom";

const initialState = {
  users: [],
  products: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH USERS": {
      return {
        ...state,
        users: action.payload,
      };
    }
    case "FETCH PRODUCTS": {
      return {
        ...state,
        products: action.payload,
      };
    }
  }
};

export const AdmincontextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const navigate = useNavigate();

  const FetchUser = async () => {
    try {
      const response = await axios.get("http://localhost:5000/users");

      dispatch({ type: "FETCH USERS", payload: response.data });
    } catch (e) {
      console.log("Eroor in fetching user:" + e.message);
    }
  };

  const FetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/products");
      dispatch({ type: "FETCH PRODUCTS", payload: response.data });
    } catch (e) {
      console.log("Error in fetching product:" + e.message);
    }
  };

  const BlockUser = async (id) => {
    try {
      await axios.patch(`http://localhost:5000/users/${id}`, {
        isBlocked: true,
      });
    } catch (e) {
      console.log("Error in blocking user:" + e.message);
    }
  };

  const UnBlockUser = async (id) => {
    try {
      await axios
        .patch(`http://localhost:5000/users/${id}`, {
          isBlocked: false,
        })
        .then(navigate("/admin/view-users"));
    } catch (e) {
      console.log("Error in unblocking user:" + e.message);
    }
  };

  const AddProduct = async (formData) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/products",
        formData,
      );
      if (response) {
        alert("new product added");
      }
    } catch (e) {
      console.log("Error in adding product:" + e.message);
    }
  };

  const EditProduct=async(id,formData)=>{
try {
  const response = await axios.patch(`http://localhost:5000/products/${id}`,formData);
  response?alert("Product Edited"):alert("failed ti add product")
  
} catch (e) {
  console.log("Error in Editing product:"+e.message);
  
}
  }
  const values = {
    state,
    FetchUser,
    FetchProducts,
    dispatch,
    BlockUser,
    UnBlockUser,
    AddProduct,
    EditProduct,
  };
  return (
    <Admincontext.Provider value={values}>
      {props.children}
    </Admincontext.Provider>
  );
};
