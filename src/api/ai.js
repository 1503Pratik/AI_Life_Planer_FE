import api from "./axios";

export const askAI = (query) => api.post("/ai/process", { query }).then(r => r.data);
export const recommendTasks = () => api.get("/ai/recommend/tasks").then(r => r.data);
export const productivityPlan = () => api.get("/ai/productivity").then(r => r.data);
