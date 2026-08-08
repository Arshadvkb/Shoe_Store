import axios from "axios";
import { Admincontext } from "../context/Admin_conext";
import { useReducer } from "react";

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
  
  const FetchUser = async () => {
    const response = await axios.get("http://localhost:5000/users");
    
    dispatch({type:"FETCH USERS",payload:response.data})
  };

  const FetchProducts=async()=>{
    const response = await axios.get("http://localhost:5000/products");
    dispatch({type:"FETCH PRODUCTS",payload:response.data})
  }

  const values = {
    FetchUser,
    FetchProducts,
    state,
    dispatch,
  };
  return (
    <Admincontext.Provider value={values}>
      {props.children}
    </Admincontext.Provider>
  );
};
