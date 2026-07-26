import { useContext } from "react";
import { AuthContext } from "../../context/Auth_Context";

const Navbar = () => {
  const { logout } = useContext(AuthContext);

  return (
    <div>
      <button onClick={logout}>logout</button>
    </div>
  );
}

export default Navbar
