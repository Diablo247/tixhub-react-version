import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import Background from "./components/background";
import "./index.css";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/signup";
import Dashboard from "./pages/Dashboard";
import Tickets from "./pages/Tickets";
import About from "./pages/About";
import Footer from "./components/footer";

function AppContent() {
  const session = JSON.parse(localStorage.getItem("ticketapp_session"));
  const isLoggedIn = session && session.loggedIn;
  const location = useLocation();

  // Hide navbar on auth routes
  const hideNavbarPaths = ["/login", "/signup"];

  return (
    <>
      <Background />

      {!hideNavbarPaths.includes(location.pathname) && <Navbar />}

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Default fallback — redirect unknown routes */}
        <Route
          path="/dashboard"
          element={
            isLoggedIn ? <Dashboard /> : <Navigate to="/login" replace />
          }
        />
        <Route
          path="/tickets"
          element={isLoggedIn ? <Tickets /> : <Navigate to="/login" replace />}
        />
        <Route path="/about" element={<About />} />
      </Routes>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
