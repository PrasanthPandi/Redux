import React, { lazy, Suspense } from "react";
import { Route } from "react-router-dom";

const Dashboard = lazy(() => import("./pages/Dashboard"));
const AddProduct = lazy(() => import("./pages/Product"));

const AdminRoutes = [
  <Route
    index
    element={
      <Suspense fallback={<div>Loading...</div>}>
        <Dashboard />
      </Suspense>
    }
  />,
  <Route
    path="dashboard"
    element={
      <Suspense fallback={<div>Loading...</div>}>
        <Dashboard />
      </Suspense>
    }
  />,
  <Route
    path="products"
    element={
      <Suspense fallback={<div>Loading...</div>}>
        <AddProduct />
      </Suspense>
    }
  />,
];

export default AdminRoutes;
