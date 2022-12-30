import { Outlet, Navigate, useLocation } from 'react-router-dom';
import BgStyle from '../components/UI/BgStyle';
import useAuth from '../hooks/useAuth';

export default function Authorized({ requiredRoles }: authorizedProps) {
  const { auth } = useAuth();
  const location = useLocation();
  console.log('auth trigger', auth);
  console.log('requiredRoles', requiredRoles);
  return Array.isArray(requiredRoles) &&
    auth?.roles?.find((role) => requiredRoles?.includes(role)) ? (
    <Outlet />
  ) : auth?.accessToken ? (
    <BgStyle position="center">
      <h2>Нет доступа</h2>
    </BgStyle>
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
}

interface authorizedProps {
  requiredRoles: string[];
}
