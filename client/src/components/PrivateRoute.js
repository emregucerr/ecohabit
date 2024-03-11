jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useLoginContext } from '../contexts/LoginContext';

const PrivateRoute = ({ children }) => {
  const { loginPending, loggedIn } = useLoginContext();

  if (!loginPending && !loggedIn) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default PrivateRoute;
