import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./component/layout/Header/Header";
import Footer from "./component/layout/Footer/Footer";
import Home from "./component/Home/Home.jsx";
import ProductDetails from "./component/Product/ProductDetails";
import Products from "./component/Product/Products.jsx";
import Search from "./component/Product/Search.jsx";
import LoginSignUp from "./component/user/LoginSignUp.jsx";
import { useEffect, useState } from "react";
import store from "./store.js";
import { loadUser } from "./actions/userActions.js";
import { useSelector } from "react-redux";
import UserOptions from "./component/layout/Header/UserOptions";
import Profile from "./component/user/Profile";
import ProtectedRoute from "./component/Route/ProtectedRoute";
import UpdateProfile from "./component/user/UpdateProfile";
import UpdatePassword from "./component/user/UpdatePassword";
import ForgotPassword from "./component/user/ForgotPassword";
import ResetPassword from "./component/user/ResetPassword";
import Cart from "./component/cart/cart";
import Shipping from "./component/cart/Shipping";
import ConfirmOrders from "./component/cart/ConfirmOrders";
import axios from "axios";
import Payment from "./component/cart/Payment";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import StripeLayout from "./component/cart/StripeLayout.jsx";

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeapikey");
    setStripeApiKey(data.stripeapikey);
  }
  useEffect(() => {
    store.dispatch(loadUser());
    getStripeApiKey();
  }, [stripeApiKey]);

  const stripePromise = stripeApiKey && loadStripe(stripeApiKey);

  return (
    <Router>
      <Header />
      {isAuthenticated && <UserOptions user={user} />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:keyword" element={<Products />} />
        <Route path="/search" element={<Search />} />
        <Route path="/login" element={<LoginSignUp />} />
        <Route element={<ProtectedRoute />}>
          <Route element={<Profile />} path="/account" />
          <Route element={<UpdateProfile />} path="/me/update" />
          <Route element={<UpdatePassword />} path="/password/update" />
          <Route element={<Shipping />} path="/shipping" />
          <Route element={<ConfirmOrders />} path="/order/confirm" />
          <Route element={<StripeLayout {...{ stripeApiKey }} />}>
            <Route
              path="/process/payment"
              element={
                <Elements stripe={stripePromise}>
                  <Payment />
                </Elements>
              }
            />
          </Route>
        </Route>
        <Route element={<ForgotPassword />} path="/password/forgot" />
        <Route element={<ResetPassword />} path="/password/reset/:token" />
        <Route element={<Cart />} path="/cart" />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
