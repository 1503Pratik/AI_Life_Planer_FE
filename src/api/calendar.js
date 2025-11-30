import api from "./axios";

export const addEvent = (payload) => api.post("/calendar/add", payload).then(r => r.data);
export const getEvents = () => api.get("/calendar/all").then(r => r.data);
