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
      console.log(JSON.stringify(prev));
      console.log(response.data.accessToken);
      return { ...prev, accessToken: response.data.accessToken };
    });
    return response.data.accessToken;
  };

  return refresh;
}
