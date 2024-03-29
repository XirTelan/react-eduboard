import axios from 'axios';
import { urlAccounts } from '../endpoints';
import useAuth from './useAuth';

export default function useRefreshToken() {
  const { setAuth } = useAuth();

  const refresh = async () => {
    try {
      const response = await axios.get(`${urlAccounts}/refresh`, {
        withCredentials: true
      });
      setAuth((prev: any) => {
        return {
          ...prev,
          fio: response.data.fio,
          accessToken: response.data.accessToken,
          roles: response.data.roles
        };
      });
      return response.data.accessToken;
    } catch (error) {
      console.log('refresh error', error);
    }
  };

  return refresh;
}
