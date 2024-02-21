import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const StripeLayout = ({ stripeApiKey }) => {
  return stripeApiKey ? <Outlet /> : <Navigate to={"/Cart"} replace />;
};

export default StripeLayout;
