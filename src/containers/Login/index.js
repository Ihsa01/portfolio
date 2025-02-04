import { useState, useEffect } from "react";
import { useAuth } from "../../components/AuthContext";
import { useNavigate } from "react-router-dom";
import "./styles.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  // Check if user is already logged in
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      navigate("/admin"); // Redirect to admin panel
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (await login(username, password)) {
      navigate("/admin");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Admin Login</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
