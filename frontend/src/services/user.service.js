import api from "./api";

export const getProfile = () =>
  api.get("/user/profile");

export const updateProfile = (data) =>
  api.put("/user/profile", data);

export const updateSettings = (data) =>
  api.put("/user/settings", data);