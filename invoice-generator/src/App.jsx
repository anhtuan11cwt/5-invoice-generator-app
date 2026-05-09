import { Toaster } from "react-hot-toast";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MenuBar from "./components/MenuBar";
import Dashboard from "./pages/Dashboard";
import LandingPage from "./pages/landing/LandingPage";
import MainPage from "./pages/MainPage";
import PreviewPage from "./pages/PreviewPage";

function App() {
  return (
    <BrowserRouter>
      <MenuBar />
      <Routes>
        <Route element={<LandingPage />} path="/" />
        <Route element={<Dashboard />} path="/dashboard" />
        <Route element={<MainPage />} path="/generate" />
        <Route element={<PreviewPage />} path="/preview" />
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
}

export default App;
