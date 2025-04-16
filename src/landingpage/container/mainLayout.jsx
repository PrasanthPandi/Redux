import React, { lazy, Suspense } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import ProtectedRoute from "./ProtectedRoute";
import AdminRoutes from "../../admin/AdminRoutes"; // ✅ Import Admin Routes

// Lazy-loaded components
const NavBar = lazy(() => import("../component/navBar"));
const Footer = lazy(() => import("../component/Footer"));
const AdminLayout = lazy(() => import("../../admin/adminLayout"));
const Home = lazy(() => import("../component/home"));
const Product = lazy(() => import("../component/product"));
const ProductDetails = lazy(() => import("../component/ProductDetails"));

const MainLayout = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <section style={{ backgroundColor: "#eef2f6" }}>
      <ToastContainer />

      {/* Wrap NavBar in Suspense */}
      {!isAdminRoute && (
        <Suspense fallback={<div>Loading Navbar...</div>}>
          <NavBar />
        </Suspense>
      )}

      <Suspense fallback={<div>Loading Page...</div>}>
        <Routes>
          {/* Normal Pages */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<h1>About Us</h1>} />
          {/* <Route path="/products" element={<Product />} /> */}
          {/* <Route 
          path="/products/:id" 
          element={
            <ProtectedRoute allowedRoles={["user", "admin"]}>
              <Suspense fallback={<div>Loading...</div>}>
                  <ProductDetails/>
                </Suspense>
            </ProtectedRoute>
          } 
        /> */}
        {/* <Route path="/products/:id" element={<ProductDetails />} /> */}

        <Route
          path="/products/:id"
          element={
            <ProtectedRoute>
              <ProductDetails />
            </ProtectedRoute>
          }
        />
       
          <Route path="/products" element={<Product />} />
          {/* <Route path="/products/:id" element={<ProductDetails />} /> */}
          <Route path="/blogs" element={<h1>Blogs</h1>} />
          <Route path="/contact" element={<h1>Contact Us</h1>} />

          {/* 🔥 Admin Routes with Nested Layout */}
          <Route
            path="/admin/*"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <Suspense fallback={<div>Loading Admin Layout...</div>}>
                  <AdminLayout />
                </Suspense>
              </ProtectedRoute>
            }
          >
            {AdminRoutes} {/* ✅ This ensures Sidebar & Header remain fixed */}
          </Route>

          <Route
            path="/user/dashboard"
            element={
              <ProtectedRoute allowedRoles={["user"]}>
                <h1>User Dashboard</h1>
              </ProtectedRoute>
            }
          />
        </Routes>
      </Suspense>

      {/* Wrap Footer in Suspense */}
      {!isAdminRoute && (
        <Suspense fallback={<div>Loading Footer...</div>}>
          <Footer />
        </Suspense>
      )}
    </section>
  );
};

export default MainLayout;
