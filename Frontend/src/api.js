import axios from "axios";

const api = axios.create({
  baseURL: "https://mern-suit-shop.onrender.com",
});

export default api;
