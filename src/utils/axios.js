import axios from "axios";
import Api from "./api";

// Cek apakah ada token di localStorage
const access_token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWI4NzE3YTY1ZmIxZDVmNWYxODVlZDAiLCJpYXQiOjE3MDY4NDcyNTYsImV4cCI6MTcwNjkzMzY1Nn0.hJktisMYF7HQ5YODrqOWR1cpQ-NHVPUX87dmC8jSYPA";
const token_type = "Bearer";

const NetworkApi = axios.create({
  headers: {
    "Content-Type": "multipart/form-data",
    Authorization:
      token_type && access_token ? `${token_type} ${access_token}` : "",
  },
});

export default NetworkApi;
