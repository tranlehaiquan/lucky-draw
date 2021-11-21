import axios from 'axios'

const { REACT_APP_BE_URL } = process.env;

const axiosInstance = axios.create({
  baseURL: REACT_APP_BE_URL
});

export const setAuth = (token: string) => {
  axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;

  return axiosInstance;
}

export default axiosInstance;