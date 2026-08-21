// // import {
// //   createContext,
// //   useContext,
// //   useState,
// // } from "react";
// // import { signOut } from "firebase/auth";

// // import { auth } from "../firebase";

// // const AuthContext = createContext();

// // export const AuthProvider = ({ children }) => {

// //   const [user, setUser] = useState(() => {

// //     const savedUser = localStorage.getItem("user");

// //     return savedUser
// //       ? JSON.parse(savedUser)
// //       : null;

// //   });

// //   const [loading, setLoading] = useState(false);

// //   /* ==========================================
// //               Firebase Auth Listener
// //   ========================================== */

// //   // useEffect(() => {

// //   //   const unsubscribe = onAuthStateChanged(
// //   //     auth,
// //   //     (firebaseUser) => {

// //   //       if (firebaseUser) {

// //   //         localStorage.setItem(
// //   //           "isLoggedIn",
// //   //           "true"
// //   //         );

// //   //       }

// //   //       setLoading(false);

// //   //     }
// //   //   );

// //   //   return unsubscribe;

// //   // }, []);



// //   /* ==========================================
// //                   LOGIN
// //   ========================================== */

// //   const login = (userData, token) => {

// //     localStorage.setItem(
// //       "token",
// //       token
// //     );

// //     localStorage.setItem(
// //       "user",
// //       JSON.stringify(userData)
// //     );

// //     localStorage.setItem(
// //       "isLoggedIn",
// //       "true"
// //     );

// //     setUser(userData);

// //   };

// //   /* ==========================================
// //                   LOGOUT
// //   ========================================== */

// //   const logout = async () => {

// //     try {

// //       await signOut(auth);

// //     } catch (err) {

// //       console.log(err);

// //     }

// //     localStorage.removeItem("token");
// //     localStorage.removeItem("user");
// //     localStorage.removeItem("isLoggedIn");

// //     setUser(null);

// //   };

// //   return (

// //     <AuthContext.Provider
// //       value={{

// //         user,

// //         loading,

// //         login,

// //         logout,

// //         isLoggedIn: !!user,

// //       }}
// //     >

// //       {!loading && children}

// //     </AuthContext.Provider>

// //   );

// // };

// // export const useAuth = () =>
// //   useContext(AuthContext);

// // export default AuthContext;






// import {
//   createContext,
//   useContext,
//   useState,
// } from "react";

// import { signOut } from "firebase/auth";
// import { auth } from "../firebase";

// import api from "../services/api";

// const AuthContext = createContext();

// /* ==========================================================
//    AUTH PROVIDER
// ========================================================== */

// export const AuthProvider = ({ children }) => {

//   /* ========================================================
//      LOAD USER FROM LOCAL STORAGE
//   ======================================================== */

//   const [user, setUser] = useState(() => {
//     try {
//       const savedUser = localStorage.getItem("user");

//       return savedUser
//         ? JSON.parse(savedUser)
//         : null;

//     } catch (error) {

//       console.error(
//         "Failed to load saved user:",
//         error
//       );

//       localStorage.removeItem("user");

//       return null;
//     }
//   });

//   const [loading, setLoading] = useState(false);

//   /* ========================================================
//      LOGIN
//   ======================================================== */

//   const login = (userData, token) => {

//     if (!userData || !token) {
//       console.error(
//         "Login failed: user or token missing"
//       );

//       return;
//     }

//     localStorage.setItem(
//       "token",
//       token
//     );

//     localStorage.setItem(
//       "user",
//       JSON.stringify(userData)
//     );

//     localStorage.setItem(
//       "isLoggedIn",
//       "true"
//     );

//     setUser(userData);
//   };

//   /* ========================================================
//      LOGOUT
//   ======================================================== */

//   const logout = async () => {

//     try {

//       setLoading(true);

//       /*
//        * Tell backend about logout.
//        *
//        * This is optional for JWT because JWT is stateless,
//        * but keeping the endpoint is fine.
//        */

//       try {

//         await api.post("/auth/logout");

//       } catch (error) {

//         /*
//          * Even if backend logout fails,
//          * we MUST clear local authentication.
//          */

//         console.log(
//           "Backend logout:",
//           error.response?.data?.message ||
//           error.message
//         );
//       }

//       /*
//        * Sign out Firebase.
//        *
//        * This is mainly important for Google login.
//        */

//       try {

//         await signOut(auth);

//       } catch (error) {

//         console.log(
//           "Firebase logout:",
//           error.message
//         );
//       }

//       /* ==============================================
//          CLEAR LOCAL AUTH DATA
//       ============================================== */

//       localStorage.removeItem("token");
//       localStorage.removeItem("user");
//       localStorage.removeItem("isLoggedIn");

//       /* ==============================================
//          CLEAR REACT AUTH STATE
//       ============================================== */

//       setUser(null);

//     } finally {

//       setLoading(false);
//     }
//   };

//   /* ========================================================
//      CONTEXT
//   ======================================================== */

//   return (
//     <AuthContext.Provider
//       value={{
//         user,
//         loading,
//         login,
//         logout,
//         isLoggedIn: !!user,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

// /* ==========================================================
//    USE AUTH
// ========================================================== */

// export const useAuth = () => {
//   const context = useContext(AuthContext);

//   if (!context) {
//     throw new Error(
//       "useAuth must be used inside AuthProvider"
//     );
//   }

//   return context;
// };

// export default AuthContext;



import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { signOut } from "firebase/auth";
import { auth } from "../firebase";

const AuthContext = createContext(null);

/* ==========================================================
   AUTH PROVIDER
========================================================== */

export const AuthProvider = ({ children }) => {
  /* ========================================================
     INITIAL USER
  ======================================================== */

  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem("user");

      if (!savedUser) {
        return null;
      }

      return JSON.parse(savedUser);
    } catch (error) {
      console.error(
        "Failed to restore saved user:",
        error
      );

      localStorage.removeItem("user");

      return null;
    }
  });

  /* ========================================================
     INITIAL TOKEN
  ======================================================== */

  const [token, setToken] = useState(() => {
    try {
      return localStorage.getItem("token") || null;
    } catch (error) {
      console.error(
        "Failed to restore authentication token:",
        error
      );

      return null;
    }
  });

  /* ========================================================
     LOADING
  ======================================================== */

  const [loading, setLoading] = useState(false);

  /* ========================================================
     LOGIN
  ======================================================== */

  const login = (userData, jwtToken) => {
    if (!userData || !jwtToken) {
      console.error(
        "Login failed: user data or JWT token missing."
      );

      return false;
    }

    try {
      /* Save JWT */
      localStorage.setItem(
        "token",
        jwtToken
      );

      /* Save user */
      localStorage.setItem(
        "user",
        JSON.stringify(userData)
      );

      /* Compatibility flag */
      localStorage.setItem(
        "isLoggedIn",
        "true"
      );

      /* Update React state */
      setToken(jwtToken);
      setUser(userData);

      return true;

    } catch (error) {
      console.error(
        "Failed to save authentication:",
        error
      );

      return false;
    }
  };

  /* ========================================================
     CLEAR AUTHENTICATION
     
     Used by:
     - logout()
     - expired JWT
     - invalid JWT
  ======================================================== */

  const clearAuthentication = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("isLoggedIn");

    setToken(null);
    setUser(null);
  };

  /* ========================================================
     LOGOUT
  ======================================================== */

  const logout = async () => {
    setLoading(true);

    try {
      /*
       * Firebase logout.
       *
       * Required for Google/Firebase sessions.
       */
      if (auth.currentUser) {
        await signOut(auth);
      }

    } catch (error) {
      /*
       * Firebase logout failure must NOT prevent
       * application logout.
       */
      console.error(
        "Firebase logout error:",
        error
      );

    } finally {
      /*
       * Always clear our JWT authentication.
       */
      clearAuthentication();

      setLoading(false);
    }
  };

  /* ========================================================
     HANDLE EXPIRED / INVALID JWT
     
     api.js dispatches:
     
       window.dispatchEvent(
         new Event("authExpired")
       );
     
     This listener clears React state too.
  ======================================================== */

  useEffect(() => {
    const handleAuthExpired = () => {
      console.warn(
        "Authentication expired. Logging out user."
      );

      clearAuthentication();
    };

    window.addEventListener(
      "authExpired",
      handleAuthExpired
    );

    return () => {
      window.removeEventListener(
        "authExpired",
        handleAuthExpired
      );
    };
  }, []);

  /* ========================================================
     AUTH STATUS
  ======================================================== */

  const isLoggedIn = Boolean(
    user && token
  );

  /* ========================================================
     PROVIDER
  ======================================================== */

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,

        login,
        logout,

        isLoggedIn,
        isAuthenticated: isLoggedIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

/* ==========================================================
   USE AUTH HOOK
========================================================== */

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider."
    );
  }

  return context;
};

export default AuthContext;