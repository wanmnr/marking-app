import { useState } from "react";
import { useNavigate } from "react-router-dom";
import userLogin from "../services/auth/userLogin";
import { useAuth } from "../contexts/AuthContext";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth(); // Use login function from AuthContext

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { token } = await userLogin(username, password);
      login(token); // Set authentication state globally
      navigate("/"); // Redirect on successful login
    } catch (err) {
      setError("Invalid Credentials");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <p>{error}</p>}
      <div>
        <label>Username:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit">Login</button>
    </form>
  );
}

export default LoginFormOld;
