import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import App from "../App";

import Login from "../pages/Login";
import Home from "../pages/Home";
import Dashboard from "../pages/Dashboard";
import FaceDetection from "../pages/FaceDetection";
import History from "../pages/History";
import Music from "../pages/Music";
import Profile from "../pages/Profile";
import Setting from "../pages/Setting";
import NotFound from "../pages/NotFound";

const PrivateRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  return isLoggedIn ? children : <Navigate to="/" replace />;
};

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>

        {/* Login */}
        <Route path="/" element={<Login />} />

        {/* Protected Routes */}
        <Route
          element={
            <PrivateRoute>
              <App />
            </PrivateRoute>
          }
        >
          <Route path="/home" element={<Home />} />

          <Route path="/dashboard" element={<Dashboard />} />

          <Route
            path="/face-detection"
            element={<FaceDetection />}
          />

          <Route path="/history" element={<History />} />

          <Route path="/music" element={<Music />} />

          <Route path="/profile" element={<Profile />} />

          <Route path="/setting" element={<Setting />} />
        </Route>

        {/* 404 */}
        <Route path="*" element={<NotFound />} />

      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;