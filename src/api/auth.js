import api from "./axios";

export const register = (name, email, password) =>
  api.post("/user/register", { name, email, password }).then(r => r.data);

export const login = (email, password) =>
  api.post("/user/login", { email, password }).then(r => r.data);

export const getProfile = (token) => {
  // token optional: axios will include token from localStorage if set
  return api.get("/user/me").then(r => r.data);
};
