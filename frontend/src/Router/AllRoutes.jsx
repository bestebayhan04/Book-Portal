import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Product from "../pages/Product";
import Profile from "../components/Profile";
import OrderDetails from "../pages/OrderDetails";
import Payment from "../pages/Payment";
import PaymentForm from "../pages/PaymentForm";
import Login from "../pages/LogIn";
import AdminLogin from "../pages/AdminLogIn";
import Registration from "../pages/Registration";
import SingleProduct from "../pages/SingleProduct";
import Cart from "../pages/Cart";
import ShippingDetails from "../pages/ShippingDetails";
import { Privateroute, Privaterouteadmin } from "../Router/ProtectedRoute";
import Admin from "../pages/Admin";
import NotFound from "../components/NotFound";
import Blacklist from "../pages/Blacklist";
import EditCustomerDetails from "../components/EditCustomerDetails";
import AdminUserDetails from "../components/AdminUserDetails";

const AllRoutes = () => {
  return (
      <>
        <Routes>
          <Route path="/" element={<Product />} />
          <Route path="/product" element={<Product />} />
          <Route path="/login" element={<Login />} />

          <Route path="/user" element={<Privateroute />}>
            <Route path="cart" element={<Cart />} />
            <Route path="save-address" element={<ShippingDetails />} />
            <Route path="order-details" element={<OrderDetails />} />
            <Route path="payment-success" element={<Payment />} />
            <Route path="make-payment" element={<PaymentForm />} />
            <Route path="profile/:userid" element={<Profile />} />
            <Route path="blacklist" element={<Blacklist />} />
          </Route>

          <Route path="/admin" element={<Privaterouteadmin />}>
            <Route path="admin" element={<Admin />} />
            <Route path="customer-details" element={<AdminUserDetails />} />
            <Route path="edit-customer/:userId" element={<EditCustomerDetails />} /> {/* New Route */}
          </Route>

          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/register-user" element={<Registration />} />
          <Route path="/product/:productId" element={<SingleProduct />} />
          <Route path="/products" element={<Product />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </>
  );
};

export default AllRoutes;
