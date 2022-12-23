import { useContext, useEffect, useState } from 'react';
import AuthenticationContext from './AuthenticationContext';
import { Outlet, Navigate, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import Login from './Login';

export default function Authorized() {
  const { auth } = useAuth();
  const location = useLocation();
  console.log('auth trigger', auth);
  return auth?.token ? <Outlet /> : <Navigate to="/login" state={{ from: location }} replace />;
}

interface authorizedProps {
  authorized: React.ReactElement;
  notAuthorized?: React.ReactElement;
  role?: string;
}

// useEffect(() => {
//   if (props.role) {
//     const index = claims.findIndex(
//       (claim) => claim.name === 'type' && claim.value === props.role
//     );
//     setIsAuthorized(index > -1);
//   } else {
//     setIsAuthorized(claims.length > 0);
//   }
// }, [claims, props.role]);
