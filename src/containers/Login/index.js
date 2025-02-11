import { useState, useEffect } from "react";
import { useAuth } from "../../components/AuthContext";
import { useNavigate } from "react-router-dom";
import "./styles.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      navigate("/admin/user"); 
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (await login(username, password)) {
      navigate("/admin/user");
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
          required
          onChange={(e) => setUsername(e.target.value)
            
          }
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
