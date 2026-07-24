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
    <div>
      <div>
        <div>
          <h1>Welcome to our Store</h1>
          <p>Create Your Account</p>
        </div>
        <form onSubmit={handleSubmit}>
          <label>Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter name..."
          />
          <label>User Name:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter username"
          />
          <label>Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter user name"
          />
          <label>Password:</label>
          <input
            type="text"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password"
          />
          <label>Confirm Password:</label>
          <input
            type="text"
            id="confirm"
            name="confirm"
            value={confirmp}
            onChange={(e) => setConfirmp(e.target.value)}
            placeholder="Confirm password"
          />
          <button type="submit">Register</button>
        </form>
        <p>
          already have an account?{" "}
          <span>
            <Link to={"/"}>Login</Link>
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;
