jsx
import React from 'react';
import { Route, Navigate, useLocation } from 'react-router-dom';
import { useLoginContext } from '../contexts/LoginContext';
import { useUserContext } from '../contexts/UserContext';

const PrivateRoute = ({ element: Component, ...rest }) => {
  const location = useLocation();
  const { loggedIn } = useLoginContext();
  const { token } = useUserContext();

  return (
    <Route
      {...rest}
      render={(props) =>
        loggedIn && token ? (
          <Component {...props} />
        ) : (
          <Navigate to="/login" state={{ from: location }} replace />
        )
      }
    />
  );
};

export default PrivateRoute;
