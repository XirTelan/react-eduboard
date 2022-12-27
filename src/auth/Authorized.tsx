import { useContext, useEffect, useState } from 'react';
import { Outlet, Navigate, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import Login from './Login';

export default function Authorized() {
  const { auth } = useAuth();
  const location = useLocation();
  console.log('auth trigger', auth);
  return auth?.accessToken ? <Outlet /> : <Navigate to="/login" state={{ from: location }} replace />;
}

interface authorizedProps {
  authorized: React.ReactElement;
  notAuthorized?: React.ReactElement;
  role?: string;
}
