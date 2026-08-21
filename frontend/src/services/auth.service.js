import api from "./api";


export const googleLogin = (data) => api.post("/auth/google", data);

export const loginUser = (data) =>
  api.post("/auth/login", data);

export const registerUser = (data) =>
  api.post("/auth/register", data);

export const logoutUser = () =>
  api.post("/auth/logout");