import api from "./api";

export const getDashboard = () =>
  api.get("/dashboard");