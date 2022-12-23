import React, { useContext } from 'react';
import AuthContext from '../auth/AuthProvider';

export default function useAuth() {
  return useContext(AuthContext);
}
