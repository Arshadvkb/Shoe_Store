import {  Navigate, Outlet } from "react-router-dom";

const ProtectdRout = ({ allowedRole }) => {
  const activeUser = sessionStorage.getItem("Active User");
  if (!activeUser) {
    return <Navigate to="/" replace />;
  }
 const user = JSON.parse(activeUser);


 if (user.role !== allowedRole) {
   return <Navigate to="/" replace />;
 }
  return <Outlet />;
};

export default ProtectdRout;
