import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const location = useLocation();

  // JWT Token
  const token = localStorage.getItem("token");

  // User Data (Optional)
  const user = localStorage.getItem("user");

  // Not Logged In
  if (!token || !user) {
    return (
      <Navigate
        to="/"
        replace
        state={{ from: location }}
      />
    );
  }

  // Logged In
  return children;
};

export default ProtectedRoute;