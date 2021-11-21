import axios from "./axios";

const login = (data: any) => {
  return axios.post(`/Users/login`, {
    userName: data.username,
    password: data.password,
    rememberMe: true
  });
};

export default login;
