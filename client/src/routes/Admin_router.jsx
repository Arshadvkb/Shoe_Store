import { Route, Routes } from "react-router-dom"
import Home from "../pages/admin/Home"

const Admin_router = () => {
  return (
    <div>
      <Routes>
        <Route path="/admin/home" element={<Home/>}/>
      </Routes>
    </div>
  )
}

export default Admin_router
