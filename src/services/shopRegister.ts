import axios from "./axios";

const shopRegister = (data: any) =>
  axios
    .post(`/Events/Register`, data)

export default shopRegister;
