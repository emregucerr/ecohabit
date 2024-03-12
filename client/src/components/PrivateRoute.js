jsx
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../contexts/AuthContext';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticated } = useContext(AuthContext);
  
  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        )
      }
    />
  );
};

export default PrivateRoute;
