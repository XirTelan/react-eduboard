import { useEffect } from 'react';
import { axiosPrivate } from '../api/axios';
import useAuth from './useAuth';
import useRefreshToken from './useRefreshToken';

export default function useAxios() {
  const refresh = useRefreshToken();
  const { auth } = useAuth();

  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config) => {
        if (config.headers && !config.headers['Authorization']) {
          config.headers['Authorization'] = `Bearer ${auth.accessToken}`;
        }
        return config;
      },
      function (error) {
        return Promise.reject(error);
      }
    );

    const responseIntercept = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (error: any) => {
        const prevRequest = error?.config;
        if (error?.response?.status === 401 && error.config && !prevRequest.__isRetryRequest) {
          prevRequest.__isRetryRequest = true;
          const newAccessToken = await refresh();

          //Weird bug in axios. Creates in headers "Symbol(defaults): Object { Accept: "application/json, text/plain, */*" }"
          // Which then cannot be read and leads to an invalid header error
          // Fix:  Either clear the headers or use the following method from  "https://github.com/axios/axios/issues/5089" :
          prevRequest.headers = JSON.parse(JSON.stringify(error.config.headers));
          prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
          return axiosPrivate(prevRequest);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    };
  }, [auth, refresh]);

  return axiosPrivate;
}
