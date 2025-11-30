import api from "./axios";

export const addGoal = (payload) => api.post("/goals/add", payload).then(r => r.data);
export const getGoals = () => api.get("/goals/all").then(r => r.data);
export const updateGoal = (goalId, payload) =>
  api.put(`/goals/update/${goalId}`, payload).then(r => r.data);
export const progressGoal = (goalId, payload) =>
  api.post(`/goals/progress/${goalId}`, payload).then(r => r.data);
