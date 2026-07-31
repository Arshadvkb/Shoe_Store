import { cartContext } from "./Cart_Context"

export const CartContextProvider=(props)=>{


    const values={a:5}
    return(
        <cartContext.Provider value={values}>{props.children}</cartContext.Provider>
    )
}