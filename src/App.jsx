import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./components/AuthContext";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Use element prop to define the component */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
