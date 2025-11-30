import api from "./axios";

export const addTask = (payload) => api.post("/tasks/add", payload).then(r => r.data);
export const getTasks = () => api.get("/tasks/all").then(r => r.data);
