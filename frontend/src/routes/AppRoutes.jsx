import React from "react";
import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom";
import {
  ProtectedRoute,
  PublicOnlyRoute,
} from "../components/guards/RouteGuards";
import MainLayout from "../layouts/MainLayout";

import {
  Login,
  Home,
  Products,
  ProductDetail,
  Cart,
  Signup,
  Profile,
  Dashboard,
  Notfound,
} from "../pages";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          {/* 🌐 Open Public Routes: Everyone can see these */}
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/notfound" element={<Notfound />} />

          {/* 🔒 Member-Only Routes: Guests are blocked and sent to /login */}
          <Route element={<ProtectedRoute />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>

          {/* 🧭 Fallback Catch-All Route */}
          <Route path="*" element={<Navigate to="/notfound" replace />} />
        </Route>

        {/* 🔓 Guest-Only Routes: Logged-in users are blocked from re-entering */}
        <Route element={<PublicOnlyRoute />}>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
