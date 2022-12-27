import axios from 'axios';
import React from 'react';
import { urlAccounts } from '../endpoints';
import useAuth from './useAuth';

export default function useRefreshToken() {
  const { setAuth } = useAuth();

  const refresh = async () => {
    const response = await axios.get(`${urlAccounts}/refresh`, {
      withCredentials: true
    });
    setAuth((prev: any) => {
      console.log('response', JSON.stringify(prev));
      return { ...prev, accessToken: response.data.accessToken };
    });
    return response.data.accessToken;
  };

  return refresh;
}
