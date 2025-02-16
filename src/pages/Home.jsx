import React from "react";
import { useAuth } from "../components/AuthContext";
import { useNavigate } from "react-router-dom";
import Search from "../components/Search"; // Make sure Search component is imported

const Home = () => {
  const { isAuthenticated, logout } = useAuth(); // Assuming logout is available
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login"); // Navigate to login page after logout
  };

  return (
    <div className="container mx-auto p-4">
      {isAuthenticated ? (
        <>
          <h1 className="text-2xl font-bold">You are logged in</h1>
          <button
            onClick={handleLogout}
            className="mt-4 p-2 bg-red-500 text-white rounded"
          >
            Log Out
          </button>

          {/* Show Search Component only if logged in */}
          <div className="mt-6">
            <Search />  {/* This will show when logged in */}
          </div>
        </>
      ) : (
        <div>
          <h2 className="text-xl">Please log in to access home page content.</h2>
        </div>
      )}
    </div>
  );
};

export default Home;
