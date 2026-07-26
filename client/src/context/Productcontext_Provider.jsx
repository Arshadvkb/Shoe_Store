import axios from "axios";
import { ProductContext } from "./Product_Context";
import { useReducer } from "react";

const initialState = {
  products: [],
  loading: true,
};

const reducer = (state, actiion) => {
  switch (actiion.type) {
    case "FETCH": {
      return {
        ...state,
        products: actiion.payload.Result.data,
      };
    }
  }
};

export const ProductContextProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchProduct = async () => {
    const Result = await axios.get("http://localhost:5000/products");
  
    dispatch({ type: "FETCH", payload: { Result } });
  };
  const value = {
    state,
    fetchProduct,
    dispatch,
  };

  return (
    <ProductContext.Provider value={value}>
      {props.children}
    </ProductContext.Provider>
  );
};
