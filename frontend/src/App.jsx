import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Layout
import MainLayout from "./layouts/MainLayout";

// Pages
import Login from "./pages/Login";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import FaceDetection from "./pages/FaceDetection";
import Music from "./pages/Music";
import History from "./pages/History";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <BrowserRouter>
      <div className="layout">
        {/* Background */}
        <div className="layout__background">
          <div className="gradient gradient--one"></div>
          <div className="gradient gradient--two"></div>
          <div className="noise"></div>
        </div>

        <div className="layout__content">
          <Routes>
            {/* Default */}
            <Route path="/" element={<Navigate to="/login" replace />} />

            {/* Login */}
            <Route path="/login" element={<Login />} />

            {/* Dashboard Layout */}
            <Route element={<MainLayout />}>
              <Route path="/home" element={<Home />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/face-detection" element={<FaceDetection />} />
              <Route path="/music" element={<Music />} />
              <Route path="/history" element={<History />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/settings" element={<Settings />} />
            </Route>

            {/* 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;