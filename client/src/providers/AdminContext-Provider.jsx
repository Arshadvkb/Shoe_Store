import axios from "axios"
import { Admincontext } from "../context/Admin_conext"


export const AdmincontextProvider=(props)=>{

    const FetchUser=async()=>{
    const users=await axios.get("http://localhost:5000/users")
    console.log(users);
    return users
    }
const values={
    FetchUser
}
return(
    <Admincontext.Provider value={values}>{props.children}</Admincontext.Provider>
)
}