import { Routes, Route } from "react-router";
import MainLayout from "./layouts/MainLayout";
import DashboardLayout from "./layouts/DashboardLayout";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./routes/ProtectedRoute";

import Overview from "./pages/dashboard/Overview";
import Profile from "./pages/dashboard/Profile";
import Settings from "./pages/dashboard/Settings";
import Users from "./pages/dashboard/Users";

export default function App() {
  return (
    <Routes>
      {/* Public pages — get Navbar/Footer from MainLayout */}
      <Route element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>

      {/* Dashboard — NO MainLayout, so no Navbar/Footer */}
      <Route element={<ProtectedRoute />}>
        <Route path="dashboard" element={<DashboardLayout />}>
          <Route index element={<Overview />} />
          <Route path="profile" element={<Profile />} />
          <Route path="users" element={<Users />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
