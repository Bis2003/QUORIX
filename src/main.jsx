import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./app";
import CurvedCanvasBackground from "./components/CurvedCanvasBackground";
import { ThemeProvider, useTheme } from "./ThemeContext";
import "./index.css";
import { BrowserRouter, useLocation } from "react-router-dom";

function ThemeToggle() {
  const { isNight, setIsNight } = useTheme();
  return (
    <button
      className="toggle-btn"
      style={{
        position: "absolute",
        top: 20,
        right: 20,
        padding: "10px 20px",
        background: isNight ? "#fff" : "#1F4959",
        color: isNight ? "#1F4959" : "#fff",
        border: "none",
        borderRadius: 5,
        cursor: "pointer",
        zIndex: 1001,
        fontWeight: "bold",
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)"
      }}
      onClick={() => setIsNight((v) => !v)}
    >
      {isNight ? "Switch to Day Mode" : "Switch to Night Mode"}
    </button>
  );
}

function Root() {
  const { isNight } = useTheme();
  const location = useLocation();
  const isAuthPage = ["/login", "/register", "/"].includes(location.pathname);

  // Set solid background for auth pages, but always show spiral
  document.body.style.background = isAuthPage
    ? (isNight ? "#000" : "#fff")
    : "unset";

  return (
    <div style={{ position: 'relative' }}>
      <CurvedCanvasBackground isNight={isNight} />
      <ThemeToggle />
      <App />
    </div>
  );
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        <Root />
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>
);
