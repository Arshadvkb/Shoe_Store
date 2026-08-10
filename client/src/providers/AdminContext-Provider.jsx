import axios from "axios";
import { Admincontext } from "../context/Admin_conext";
import { useReducer } from "react";
import { useNavigate } from "react-router-dom";

const initialState = {
  users: [],
  products: [],
};

const reducer = (state, action) => {
    switch(action.type){
        case "FETCH USERS":{
            return{
                ...state,
              users:action.payload
            }
        }
        case "FETCH PRODUCTS":{
             return {
               ...state,
               products: action.payload,
             };
        }
    }
};

export const AdmincontextProvider = (props) => {

  const [state, dispatch] = useReducer(reducer, initialState);
  const navigate=useNavigate()

  const FetchUser = async () => {
    const response = await axios.get("http://localhost:5000/users");
    
    dispatch({type:"FETCH USERS",payload:response.data})
  };

  const FetchProducts=async()=>{
    const response = await axios.get("http://localhost:5000/products");
    dispatch({type:"FETCH PRODUCTS",payload:response.data})
  };

  const BlockUser=async(id)=>{
    await axios.patch(`http://localhost:5000/users/${id}`, {
      isBlocked:true,
    });
  }

  const UnBlockUser=async(id)=>{
     await axios
       .patch(`http://localhost:5000/users/${id}`, {
         isBlocked: false,
       })
       .then(navigate("/admin/view-users"));
  }

  const AddProduct=async(formData)=>{
    const response = await axios.post("http://localhost:5000/products",formData);
    if(response){
      alert("new product added")
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
  };
  return (
    <Admincontext.Provider value={values}>
      {props.children}
    </Admincontext.Provider>
  );
};
