import React, { createContext, ReactElement, useState } from 'react';
import { string } from 'yup/lib/locale';
import { claim } from './auth.model';

const AuthContext = createContext<{ auth: authUser; setAuth: React.SetStateAction<any> }>({
  auth: { token: '' },
  setAuth: () => {}
});

export const AuthProvider = ({ children }: authProviderProps) => {
  const [auth, setAuth] = useState({ token: '' });
  console.log('Get Auth', auth.token);
  return <AuthContext.Provider value={{ auth, setAuth }}>{children}</AuthContext.Provider>;
};

export default AuthContext;

interface authProviderProps {
  children: ReactElement;
}

interface authUser {
  token: string;
  // claims: claim[];
}
