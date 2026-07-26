import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/Auth_Context";

const Register = () => {
  const { dispatch, register } = useContext(AuthContext);

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmp, setConfirmp] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password == confirmp) {
      const userData = {
        name: name,
        username: username,
        email: email,
        password: password,
        role: "user",
        cart: [],
        wishlist: [],
      };
      dispatch({
        type: "REGISTER",
        payload: { userData },
      });
      register(userData);
    } else {
      alert("password and confirm password must be same");
    }
  };

  return (
    <div className="min-h-screen min-w-screen bg-neutral flex items-center justify-center">
      <div className="h-[80vh] w-[25vw] bg-secondary flex flex-col items-center justify-evenly rounded-2xl">
        <div>
          <h1 className="text-2xl font-bold text-primary">
            Welcome to our Store
          </h1>
          <p className=" text-center">Create Your Account</p>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <label>Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter name..."
            className="border-2 border-black rounded-xl pl-2 bg-neutral h-8"
          />
          <label>User Name:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter username"
            className="border-2 border-black rounded-xl pl-2 bg-neutral h-8"
          />
          <label>Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter user email"
            className="border-2 border-black rounded-xl pl-2 bg-neutral h-8"
          />
          <label>Password:</label>
          <input
            type="text"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password"
            className="border-2 border-black rounded-xl pl-2 bg-neutral h-8"
          />
          <label>Confirm Password:</label>
          <input
            type="text"
            id="confirm"
            name="confirm"
            value={confirmp}
            onChange={(e) => setConfirmp(e.target.value)}
            placeholder="Confirm password"
            className="border-2 border-black rounded-xl pl-2 bg-neutral h-8"
          />
          <button
            className="border-2 border-black rounded-xl  bg-neutral h-8 "
            type="submit"
          >
            Register
          </button>
        </form>
        <p>
          already have an account?{" "}
          <span className="text-blue-700 underline">
            <Link to={"/"}>Login</Link>
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;
