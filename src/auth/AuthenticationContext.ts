import React from 'react';
import { claim } from './auth.model';

const AuthenticationContext = React.createContext<{
  claims: claim[];
  update(claims: claim[]): void;
  /* eslint-disable */
}>({ claims: [], update: () => {} });
/* eslint-enable */
export default AuthenticationContext;
