import axios from "axios";

const api = axios.create({
  baseURL: "https://su-bitspilani.org/su/signings-api/",
});

export default api;
