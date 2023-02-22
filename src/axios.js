import axios from "axios";

const api = axios.create({
  headers: {
    "x-authorization":
      "048f1579b8b8f75f609f036ecb26623ddd0f58d4ff9193a14d4284ac4ff0c87b9093ed08947f25ea72cd141b23be5f2b12e10ccf4522c327f8172f76d1554fb6",
    "x-origin": "826bead8ad2ad9ce955028045788f371",
    "Content-Type": "application/json",
  },

  baseURL: "https://su-bitspilani.org/su/signings-api/",
});

export default api;
