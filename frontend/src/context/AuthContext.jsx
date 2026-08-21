import {
  createContext,
  useContext,
  useState,
} from "react";
import { signOut } from "firebase/auth";

import { auth } from "../firebase";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(() => {

    const savedUser = localStorage.getItem("user");

    return savedUser
      ? JSON.parse(savedUser)
      : null;

  });

  const [loading, setLoading] = useState(false);

  /* ==========================================
              Firebase Auth Listener
  ========================================== */

  // useEffect(() => {

  //   const unsubscribe = onAuthStateChanged(
  //     auth,
  //     (firebaseUser) => {

  //       if (firebaseUser) {

  //         localStorage.setItem(
  //           "isLoggedIn",
  //           "true"
  //         );

  //       }

  //       setLoading(false);

  //     }
  //   );

  //   return unsubscribe;

  // }, []);



  /* ==========================================
                  LOGIN
  ========================================== */

  const login = (userData, token) => {

    localStorage.setItem(
      "token",
      token
    );

    localStorage.setItem(
      "user",
      JSON.stringify(userData)
    );

    localStorage.setItem(
      "isLoggedIn",
      "true"
    );

    setUser(userData);

  };

  /* ==========================================
                  LOGOUT
  ========================================== */

  const logout = async () => {

    try {

      await signOut(auth);

    } catch (err) {

      console.log(err);

    }

    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("isLoggedIn");

    setUser(null);

  };

  return (

    <AuthContext.Provider
      value={{

        user,

        loading,

        login,

        logout,

        isLoggedIn: !!user,

      }}
    >

      {!loading && children}

    </AuthContext.Provider>

  );

};

export const useAuth = () =>
  useContext(AuthContext);

export default AuthContext;