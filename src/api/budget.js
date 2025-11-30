import api from "./axios";

export const addTransaction = (payload) => api.post("/budget/add", payload).then(r => r.data);
export const getSummary = () => api.get("/budget/summary").then(r => r.data);
