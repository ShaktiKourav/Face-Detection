import api from "./api";

export const getHistory = () =>
  api.get("/history");

export const deleteHistory = (id) =>
  api.delete(`/history/${id}`);

export const clearHistory = () =>
  api.delete("/history");