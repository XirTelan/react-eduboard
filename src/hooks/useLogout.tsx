import axios from 'axios';
import React from 'react';
import { urlAccounts } from '../endpoints';
import useAuth from './useAuth';

export default function useLogout() {
  const { setAuth } = useAuth();

  const logout = async () => {
    setAuth({});
    try {
      const response = await axios.get(`${urlAccounts}/logout`, { withCredentials: true });
    } catch (error) {
      console.log(error);
    }
  };
  return logout;
}
