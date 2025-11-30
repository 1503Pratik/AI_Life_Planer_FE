import axios from "axios";

export const API_BASE = "http://localhost:5000";

const instance = axios.create({
  baseURL: API_BASE,
  headers: { "Content-Type": "application/json" },
});

// Add auth header automatically from localStorage
instance.interceptors.request.use((cfg) => {
  const token = localStorage.getItem("token");
  if (token) cfg.headers["Authorization"] = `Bearer ${token}`;
  return cfg;
});

export default instance;
