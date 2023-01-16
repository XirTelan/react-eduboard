/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-function */
import React, { createContext, ReactElement, useState } from 'react';

const AuthContext = createContext<{
  auth: authUser;
  setAuth: React.SetStateAction<any>;
  persist: boolean;
  setPersist: React.SetStateAction<any>;
}>({
  auth: { fio: '', accessToken: '', roles: [] },
  setAuth: () => {},
  persist: false,
  setPersist: () => {}
});

export const AuthProvider = ({ children }: authProviderProps) => {
  const [auth, setAuth] = useState({
    fio: '',
    accessToken: '',
    roles: []
  });
  const [persist, setPersist] = useState(() => {
    const persistStorage = localStorage.getItem('persist');
    return persistStorage ? JSON.parse(persistStorage) : false;
  });
  return (
    <AuthContext.Provider value={{ auth, setAuth, persist, setPersist }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

interface authProviderProps {
  children: ReactElement;
}

interface authUser {
  fio: string;
  accessToken: string;
  roles: string[];
}
