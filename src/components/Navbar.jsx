import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../components/AuthContext";

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth(); // Assuming logout is available

  return (
    <div className="navbar">
      <Link to="/">Home</Link>

      {isAuthenticated ? (
        <button onClick={logout} className="ml-4 bg-red-500 text-white rounded p-2">
          Log Out
        </button>
      ) : (
        <Link to="/login" className="ml-4 bg-blue-500 text-white rounded p-2">
          Log In
        </Link>
      )}
    </div>
  );
};

export default Navbar;
