import axios from 'axios';
import { useEffect } from 'react';
import { api } from '../api';
import useAuth from './useAuth';

export default function useAxios() {
  const { auth, setAuth } = useAuth();
  useEffect(() => {
    // add request interceptor
    const requestInterceptor = api.interceptors.request.use(
      (config) => {
        const token = auth?.accessToken;
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // add a response interceptor
    const responseInterceptor = api.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response?.status === 401 && !error.config._retry) {
          error.config._retry = true;
          try {
            const refreshToken = auth?.refreshToken;
            const response = await axios.post(
              `${import.meta.env.VITE_SERVER_BASE_URL}/auth/refresh-token`,
              { refreshToken }
            );
            const { token } = response.data;
            console.log('New Access Token:', token);
            setAuth({ ...auth, accessToken: token });

            error.config.headers.Authorization = `Bearer ${token}`;
            return axios(error.config);
          } catch (err) {
            return Promise.reject(err);
          }
        }
        return Promise.reject(error);
      }
    );

    return () => {
      api.interceptors.request.eject(requestInterceptor);
      api.interceptors.response.eject(responseInterceptor);
    };
  }, [auth.accessToken]);
  return api;
}
