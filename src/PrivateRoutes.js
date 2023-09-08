// PrivateRoute.js
import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const PrivateRoute = ({ element, ...rest }) => {
  const { authState } = useAuth();

  return authState.isAuthenticated ? (
    <Route {...rest} element={element} />
  ) : (
    <Navigate to="/" replace />
  );
};

export default PrivateRoute;
