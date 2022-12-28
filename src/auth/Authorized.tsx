import { useContext, useEffect, useState } from 'react';
import { Outlet, Navigate, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import Login from './Login';

export default function Authorized({ requiredRoles }: authorizedProps) {
  const { auth } = useAuth();
  const location = useLocation();
  console.log('auth trigger', auth);
  console.log('requiredRoles', requiredRoles);
  return Array.isArray(requiredRoles) && auth?.roles?.find((role) => requiredRoles?.includes(role)) ? (
    <Outlet />
  ) : auth?.accessToken ? (
    <h1>not auth</h1>
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
}

interface authorizedProps {
  requiredRoles: string[];
}
