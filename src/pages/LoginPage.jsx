import React, { useState } from "react";
import { useAuth } from "../components/AuthContext";
import { useNavigate } from "react-router-dom";  // Use useNavigate instead of useHistory

const LoginPage = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // To store any error message
  const navigate = useNavigate();  // Replace history with navigate

  const handleLogin = () => {
    // Basic validation for email and password
    if (!email || !password) {
      setError("Email and password are required!");
      return;
    }

    // Reset error message if any
    setError("");

    // Call the login function from the context
    login();

    // Navigate to the home page after successful login
    navigate("/");
  };

  return (
    <div>
      <h1>Login</h1>
      
      {/* Error message display */}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default LoginPage;
