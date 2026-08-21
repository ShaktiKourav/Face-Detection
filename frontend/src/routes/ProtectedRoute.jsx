

// import { Navigate, useLocation } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";

// const ProtectedRoute = ({ children }) => {

//   const { isLoggedIn, loading } = useAuth();

//   const location = useLocation();

//   if (loading) return null;

//   if (!isLoggedIn) {

//     return (
//       <Navigate
//         to="/"
//         replace
//         state={{ from: location }}
//       />
//     );

//   }

//   return children;
// };
//export default ProtectedRoute;


import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const {
    isAuthenticated,
    loading,
  } = useAuth();

  const location = useLocation();

  /* ==========================================================
     AUTH STATE LOADING
  ========================================================== */

  if (loading) {
    return (
      <div
        className="
          flex
          min-h-screen
          items-center
          justify-center
          bg-[var(--bg-color)]
        "
      >
        <div
          className="
            h-10
            w-10
            animate-spin
            rounded-full
            border-4
            border-pink-500
            border-t-transparent
          "
        />
      </div>
    );
  }

  /* ==========================================================
     NOT AUTHENTICATED
  ========================================================== */

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/"
        replace
        state={{
          from: location,
        }}
      />
    );
  }

  /* ==========================================================
     AUTHENTICATED
  ========================================================== */

  return children;
};

export default ProtectedRoute;