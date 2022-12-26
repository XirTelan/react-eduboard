import React, { createContext, ReactElement, useState } from 'react';
import { string } from 'yup/lib/locale';
import { claim } from './auth.model';

const AuthContext = createContext<{ auth: authUser; setAuth: React.SetStateAction<any> }>({
  auth: { accessToken: '', user: { username: '', role: '' } },
  setAuth: () => {}
});

export const AuthProvider = ({ children }: authProviderProps) => {
  const [auth, setAuth] = useState({ accessToken: '', user: { username: '', role: '' } });
  console.log('Get Auth', auth.accessToken);
  return <AuthContext.Provider value={{ auth, setAuth }}>{children}</AuthContext.Provider>;
};

export default AuthContext;

interface authProviderProps {
  children: ReactElement;
}

interface authUser {
  accessToken: string;
  user: user;
  // claims: claim[];
}

interface user {
  username: string;
  role: string;
}
