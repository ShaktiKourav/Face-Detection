

// const ProtectedRoute = ({ children }) => {
//   const location = useLocation();

//   // JWT Token
//   const token = localStorage.getItem("token");

//   // User Data (Optional)
//   const user = localStorage.getItem("user");

//   // Not Logged In
//   if (!token || !user) {
//     return (
//       <Navigate
//         to="/"
//         replace
//         state={{ from: location }}
//       />
//     );
//   }

//   // Logged In
//   return children;
// };


import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {

  const { isLoggedIn, loading } = useAuth();

  const location = useLocation();

  if (loading) return null;

  if (!isLoggedIn) {

    return (
      <Navigate
        to="/"
        replace
        state={{ from: location }}
      />
    );

  }

  return children;
};



export default ProtectedRoute;