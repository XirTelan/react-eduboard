import axios, { AxiosError } from 'axios';
import React, { useEffect } from 'react';
import Swal from 'sweetalert2';
import { axiosPrivate } from '../api/axios';
import useAuth from './useAuth';
import useRefreshToken from './useRefreshToken';

export default function useAxios() {
  const refresh = useRefreshToken();
  const { auth, setAuth } = useAuth();

  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers!['Authorization']) {
          config.headers!['Authorization'] = `Bearer ${auth.accessToken}`;
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
        if (error?.response?.status === 401 && !prevRequest?.sent) {
          Swal.fire('Update page', 'Please udpate page', 'warning');
          prevRequest.sent = true;
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
