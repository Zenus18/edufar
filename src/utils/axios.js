import axios from "axios";

const NetworkApi = axios.create({
  headers: {
    "Content-Type": "multipart/form-data",
  },
});
NetworkApi.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);
export default NetworkApi;
