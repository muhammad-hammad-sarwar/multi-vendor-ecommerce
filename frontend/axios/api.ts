import axios from "axios";

console.log(process.env?.NODE_ENV);
const api = axios.create({
  baseURL:
    process.env?.NODE_ENV === "development"
      ? "http://localhost:8000/"
      : "https://multi-vendor-ecommerce-jc8e.vercel.app/",
  withCredentials: true,
});

export default api;
