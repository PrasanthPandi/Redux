import React, { useState, useEffect, createContext } from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import { ThemeProvider } from "@mui/material/styles";
import { getTheme } from "../theme";
import { motion } from "framer-motion";

export const ThemeContext = createContext();

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 768);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => setDarkMode((prev) => !prev);
  const handleMenuToggle = () => setIsSidebarOpen((prev) => !prev);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (!mobile) setIsSidebarOpen(true);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      <ThemeProvider theme={getTheme(darkMode ? "dark" : "light")}>
        <Header onMenuToggle={handleMenuToggle} />
        <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
          <motion.aside
            initial={{ width: isSidebarOpen ? 80 : 80 }}
            animate={{ width: isSidebarOpen ? 250 : 80 }}
            transition={{ duration: 0.3 }}
            style={{
              backgroundColor: darkMode ? "#1E1E1E" : "#F7F7F7",
              color: darkMode ? "#FFFFFF" : "#333333",
              height: "100vh",
              position: "fixed",
              top: "56px",
              left: 0,
              zIndex: 900,
              padding: "1rem",
              overflow: "auto",
            }}
          >
            <Sidebar isSidebarOpen={isSidebarOpen} />
          </motion.aside>

          <motion.main
            animate={{
              marginLeft: isSidebarOpen ? (isMobile ? 0 : 250) : 80,
            }}
            transition={{ duration: 0.3 }}
            style={{
              flexGrow: 1,
              padding: "1rem",
              marginTop: "56px",
              backgroundColor: darkMode ? "#121212" : "#FFFFFF",
              color: darkMode ? "#FFFFFF" : "#000000",
              overflowY: "auto",
              height: "calc(100vh - 56px)",
            }}
          >
            <Outlet />
          </motion.main>
        </div>
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

export default AdminLayout;
