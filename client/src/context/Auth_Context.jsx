import { createContext, useReducer } from "react";


export const AuthContext=createContext(null)

const initialState={
    name:"",
    username:"",
    email:"",
    password:"",
    role:""

}

const reducer=(state,action)=>{
console.log(state);
console.log(action);


}

export const AuthContextProvider=(props)=>{
    const [state,dispatch]=useReducer(reducer,initialState)

    const values={
        state,
        dispatch
    }

    return(
        <AuthContext.Provider value={values}>{props.children}</AuthContext.Provider>
    )
}