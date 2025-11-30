import api from "./axios";

export const addHabit = (payload) => api.post("/habits/add", payload).then(r => r.data);
export const getHabits = () => api.get("/habits/all").then(r => r.data);
export const completeHabit = (habitId, date = null) =>
  api.post(`/habits/complete/${habitId}`, { date }).then(r => r.data);
export const updateHabit = (habitId, payload) =>
  api.put(`/habits/update/${habitId}`, payload).then(r => r.data);
export const updateFitness = (habitId, payload) =>
  api.post(`/habits/fitness/update/${habitId}`, payload).then(r => r.data);
