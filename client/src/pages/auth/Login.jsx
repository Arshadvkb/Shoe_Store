import { useContext, useState } from "react";
import { AuthContext } from "../../context/Auth_Context";

const Login = () => {
  const { dispatch ,login} = useContext(AuthContext);
  const [uname, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({
      type: "LOGIN",
      payload: { username: uname, password: password },
    });
    login()
  };

  return (
    <div>
      <div>
        <form onSubmit={handleSubmit}>
          <input
            placeholder="User name"
            value={uname}
            onChange={(e) => setName(e.target.value)}
            id="username"
            className=""
            type="text"
          />
          <input
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="password"
            className=""
            type="password"
          />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
