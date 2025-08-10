import React from 'react';
import { Navigate } from 'react-router-dom';
import useStore from './store';

export default function PrivateRoute({ children }) {
  const { user } = useStore();
  return user ? children : <Navigate to="/login" replace />;
}
