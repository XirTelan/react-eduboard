import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import useRefreshToken from '../hooks/useRefreshToken';

export default function PersistLogin() {
  const [isLoading, setIsLoading] = useState(true);
  const { auth, persist } = useAuth();
  const refresh = useRefreshToken();

  useEffect(() => {
    let isMounted = true;
    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (error) {
        console.log(error);
      } finally {
        isMounted && setIsLoading(false);
      }
    };
    !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false);
    return () => {
      isMounted = false;
    };
  }, []);

  return <>{!persist ? <Outlet /> : isLoading ? <div>PersistLogin</div> : <Outlet />}</>;
}
