import { useContext, useState } from "react";
import { AuthContext } from "../../context/Auth_Context";
import { Link } from "react-router-dom";
import{LogIn} from "lucide-react"
const Login = () => {
  const { dispatch, login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = { email: email, password: password };
    dispatch({
      type: "LOGIN",
      payload: { userData},
    });
    login(userData);
  };

  return (
    <div className="min-h-screen min-w-screen bg-neutral flex items-center justify-center">
      <div className="h-75 w-100 bg-tertiary rounded-2xl flex flex-col items-center justify-around ">
        <LogIn className=" text-primary text-3xl"/>
        <h1 className="text-2xl font-bold text-primary">Welcome Back!</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <label >Email:</label>
          <input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            id="email"
            className="border-2 border-black rounded-xl pl-2 bg-neutral h-8"
            type="text"
          />
          <label >Password:</label>
          <input
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="password"
            className="border-2 border-black rounded-xl pl-2 bg-neutral h-8"
            type="password"
          />
          <button
            type="submit"
            className="border-2 border-black rounded-xl  bg-neutral h-8 "
          >
            Login
          </button>
        </form>
        <p>
          dont have an account?{" "}
          <span className="text-blue-700 underline">
            <Link to={"/register"}>Sign up</Link>
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
