jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useLoginContext } from "../contexts/LoginContext";

const PrivateRoute = ({ children }) => {
  const { loginPending, loggedIn } = useLoginContext();

  if (loginPending) {
    // Instead of rendering nothing, a developer could consider prompting the user with a spinner or some loading indicator.
    return <div>Loading...</div>; // Example loading text, a spinner/loader component can be implemented here as well.
  }
  
  return loggedIn ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
