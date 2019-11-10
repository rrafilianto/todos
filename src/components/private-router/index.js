import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import auth from '../../utils/services/authentication-service';

const PrivateRoute = ({ children, ...props }) => {
  return (
    <Route
      {...props}
      render={({ location }) =>
        auth.getToken() ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/',
              state: { from: location }
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
