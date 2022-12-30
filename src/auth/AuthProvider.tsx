import React, { createContext, ReactElement, useState } from 'react';

const AuthContext = createContext<{
  auth: authUser;
  setAuth: React.SetStateAction<any>;
  persist: boolean;
  setPersist: React.SetStateAction<any>;
}>({
  auth: { accessToken: '', roles: [] },
  setAuth: () => {},
  persist: false,
  setPersist: () => {},
});

export const AuthProvider = ({ children }: authProviderProps) => {
  const [auth, setAuth] = useState({
    accessToken: '',
    roles: []
  });
  const [persist, setPersist] = useState(() => {
    const persistStorage = localStorage.getItem('persist');
    return persistStorage ? JSON.parse(persistStorage) : false;
  });
  console.log('Get Auth', auth.accessToken);
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
  accessToken: string;
  roles: string[];
}
