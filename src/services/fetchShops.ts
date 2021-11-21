import axios from "./axios";

const fetchShops = () =>
  axios
    .get("/Events/GetData/100")

export default fetchShops;
