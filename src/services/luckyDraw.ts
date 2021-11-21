import axios from "./axios";

const luckyDraw = (number: number) =>
  axios
    .post(`/Events/LuckyDraw/${number}`, {
    } as any)

export default luckyDraw;
