import axios from "./axios";

const fetchShops = ({ signal }: any) =>
  axios
    .get("/Events/GetData/100", {
      signal
    } as any)

export default fetchShops;
