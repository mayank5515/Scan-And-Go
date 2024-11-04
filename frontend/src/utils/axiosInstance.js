import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/api/v1", // Set your server base URL here
  withCredentials: true, // Necessary for HTTP-only cookies
});

export default axiosInstance;
