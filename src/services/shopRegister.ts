import axios from "./axios";

const luckyDraw = (data: any) =>
  axios
    .post(`/Events/Register`, data)

export default luckyDraw;
