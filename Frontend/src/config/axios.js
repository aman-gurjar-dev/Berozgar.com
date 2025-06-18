import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/",
  withCredentials: true, // if you're using cookies/auth
});

export default axiosInstance;
