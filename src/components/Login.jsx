import React from 'react';
import { useAuth } from './AuthContext';  // Make sure this import is correct

const Login = () => {
  const { login } = useAuth();  // Destructure the login function from the context

  return (
    <div>
      <h1>Please Log In</h1>
      <button onClick={login}>Login</button>  {/* Call login when clicked */}
    </div>
  );
};

export default Login;
