import { Routes, Route, Navigate } from "react-router-dom";

import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Detection from "../pages/Detection";
import Music from "../pages/Music";
import History from "../pages/History";
import Setting from "../pages/Setting";
import NotFound from "../pages/NotFound";
import Register from "../pages/Register";
import DashboardLayout from "../layouts/DashboardLayout";
import ProtectedRoute from "./ProtectedRoute";

const AppRoutes = () => {
  return (
    <Routes>
      {/* ================= Login ================= */}
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* ============== Protected Routes ============== */}
      <Route
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/detection" element={<Detection />} />
        <Route path="/music" element={<Music />} />
        <Route path="/history" element={<History />} />
        <Route path="/setting" element={<Setting />} />
      </Route>

      {/* ============== Redirect ============== */}
      <Route path="/home" element={<Navigate to="/dashboard" replace />} />

      {/* ============== 404 ============== */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;