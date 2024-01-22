import React, { useState, useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import UserContext from '../contexts/UserContext';

const PrivateRoute = ({ children, ...rest }) => {
const { user } = useContext(UserContext);

if (typeof user === 'undefined') {
  console.error('UserContext has not been initialized.');
  return <Redirect to="/error" />;
}

return (
    <Route
      {...rest}
      render={({ location }) =>
        user ? (
          children
        ) : (
          <Redirect to={{
            pathname: '/login',
            state: { from: location }
          }}/>
        )
      }
    />
  );
};
export default PrivateRoute;
