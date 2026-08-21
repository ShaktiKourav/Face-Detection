

import axios from "axios";

/* ==========================================================
   AXIOS API INSTANCE
========================================================== */

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,

  headers: {
    "Content-Type": "application/json",
  },

  timeout: 15000,
});

/* ==========================================================
   REQUEST INTERCEPTOR
   Add JWT to protected API requests
========================================================== */

api.interceptors.request.use(
  (config) => {
    try {
      const token = localStorage.getItem("token");

      if (token) {
        config.headers = config.headers || {};

        config.headers.Authorization =
          `Bearer ${token}`;
      }

      return config;

    } catch (error) {
      console.error(
        "API request interceptor error:",
        error
      );

      return config;
    }
  },

  (error) => {
    return Promise.reject(error);
  }
);

/* ==========================================================
   RESPONSE INTERCEPTOR
========================================================== */

api.interceptors.response.use(
  (response) => {
    return response;
  },

  (error) => {
    const status = error.response?.status;
    const requestUrl = error.config?.url || "";

    /* ======================================================
       AUTH REQUEST CHECK
       
       Login/Register/Google errors should NOT automatically
       remove an existing session.
    ====================================================== */

    const isAuthRequest =
      requestUrl.includes("/auth/login") ||
      requestUrl.includes("/auth/register") ||
      requestUrl.includes("/auth/google");

    /* ======================================================
       TOKEN EXPIRED / INVALID
       
       Only clear authentication for protected requests.
    ====================================================== */

    if (
      status === 401 &&
      !isAuthRequest
    ) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("isLoggedIn");

      /*
       * Tell the application that authentication
       * has become invalid.
       *
       * AuthContext can listen to this event and
       * clear React state.
       */

      window.dispatchEvent(
        new Event("authExpired")
      );
    }

    return Promise.reject(error);
  }
);

export default api;