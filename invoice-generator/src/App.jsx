import { Toaster } from "react-hot-toast";
import { Navigate, Route, Routes } from "react-router-dom";
import MenuBar from "./components/MenuBar";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { PublicRoute } from "./components/PublicRoute";
import ForgotPasswordPage from "./pages/auth/ForgotPasswordPage";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import VerifyEmailPage from "./pages/auth/VerifyEmailPage";
import Dashboard from "./pages/Dashboard";
import LandingPage from "./pages/landing/LandingPage";
import MainPage from "./pages/MainPage";
import PreviewPage from "./pages/PreviewPage";

function AppRoutes() {
  return (
    <>
      <MenuBar />
      <Routes>
        <Route element={<LandingPage />} path="/" />

        <Route
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
          path="/login"
        />

        <Route
          element={
            <PublicRoute>
              <RegisterPage />
            </PublicRoute>
          }
          path="/register"
        />

        <Route
          element={
            <PublicRoute>
              <VerifyEmailPage />
            </PublicRoute>
          }
          path="/verify-email"
        />

        <Route
          element={
            <PublicRoute>
              <ForgotPasswordPage />
            </PublicRoute>
          }
          path="/forgot-password"
        />

        <Route
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
          path="/dashboard"
        />

        <Route
          element={
            <ProtectedRoute>
              <MainPage />
            </ProtectedRoute>
          }
          path="/generate"
        />

        <Route
          element={
            <ProtectedRoute>
              <PreviewPage />
            </ProtectedRoute>
          }
          path="/preview"
        />

        <Route element={<Navigate replace to="/" />} path="*" />
      </Routes>
      <Toaster position="top-right" />
    </>
  );
}

function App() {
  return <AppRoutes />;
}

export default App;
