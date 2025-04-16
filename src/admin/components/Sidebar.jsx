import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaTachometerAlt, FaBox, FaShoppingCart } from "react-icons/fa";
import { motion } from "framer-motion";

const menuItems = [
  { path: "/admin/dashboard", label: "Dashboard", icon: <FaTachometerAlt /> },
  { path: "/admin/products", label: "Products", icon: <FaBox /> },
  { path: "/admin/orders", label: "Orders", icon: <FaShoppingCart /> },
];

const Sidebar = ({ isSidebarOpen }) => {
  const location = useLocation();

  const linkVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.1 },
    }),
  };

  const sidebarStyles = {
    display: "flex",
    flexDirection: "column",
    alignItems: isSidebarOpen ? "flex-start" : "center",
    gap: "1rem",
  };

  const linkStyles = (path) => ({
    display: "flex",
    alignItems: "center",
    gap: isSidebarOpen ? "8px" : "0",
    textDecoration: "none",
    color: location.pathname === path ? "#007bff" : "#333",
    backgroundColor: location.pathname === path ? "#f0f0f0" : "transparent",
    borderRadius: "5px",
    fontSize: "1.1rem",
    fontWeight: "bold",
    padding: isSidebarOpen ? "0.5rem 1rem" : "0.5rem",
    width: "100%",
    justifyContent: isSidebarOpen ? "flex-start" : "center",
  });

  const iconStyles = {
    fontSize: "1.5rem",
  };

  return (
    <div style={sidebarStyles}>
      {menuItems.map((item, i) => (
        <motion.div
          key={item.path}
          custom={i}
          variants={linkVariants}
          initial="hidden"
          animate="visible"
          style={{ width: "100%" }}
        >
          <Link to={item.path} style={linkStyles(item.path)}>
            <span style={iconStyles}>{item.icon}</span>
            {isSidebarOpen && item.label}
          </Link>
        </motion.div>
      ))}
    </div>
  );
};

export default Sidebar;
