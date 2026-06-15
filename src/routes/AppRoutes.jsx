import { Routes, Route, BrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";

import {
  Signup,
  Home,
  Products,
  ProductDetail,
  Cart,
  Login,
  Analytics,
  Settings,
} from "../pages";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetail />} />

          <Route path="/cart" element={<Cart />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />}>
            {/*A dashboard page should also work like SPA(no new routes, everything loads in same path(ie localhost:/dashboard) but for the sake of demonstration of nested routes(need outlets ofc) here we are*/}
            <Route path="analytics" element={<Analytics />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
