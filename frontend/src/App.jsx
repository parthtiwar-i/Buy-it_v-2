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
import Cart from "./component/cart/Cart";
import Shipping from "./component/cart/Shipping";
import ConfirmOrders from "./component/cart/ConfirmOrders";
import axios from "axios";
import Payment from "./component/cart/Payment";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import StripeLayout from "./component/cart/StripeLayout.jsx";
import OrderSuccess from "./component/cart/OrderSuccess";
import MyOrders from "./component/MyOrders/MyOrders.jsx";
import OrderDetails from "./component/MyOrders/OrderDetails.jsx";
import Dashboard from "./component/Admin/Dashboard.jsx";
import ProtectedAdminRoute from "./component/Admin/ProtectedAdminRoute.jsx";
import ProductList from "./component/Admin/ProductList.jsx";
import NewProduct from "./component/Admin/NewProduct.jsx";
import UpdateProduct from "./component/Admin/UpdateProduct.jsx";
import OrderList from "./component/Admin/OrderList.jsx";
import OrderProcessing from "./component/Admin/OrderProcessing.jsx";
import UsersList from "./component/Admin/UsersList.jsx";
import UpdateUser from "./component/Admin/UpdateUser.jsx";
import ProductReviews from "./component/Admin/ProductReviews.jsx";
import NotFound from "./component/layout/NotFound/NotFound.jsx";
import About from "./component/layout/About/About.jsx";
import Contact from "./component/layout/Contact/Contact.jsx";

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeapikey");
    setStripeApiKey(data.stripeapikey);
  }
  useEffect(() => {
    if (user) {
      store.dispatch(loadUser());
    }
    getStripeApiKey();
  }, [stripeApiKey]);

  const stripePromise = stripeApiKey && loadStripe(stripeApiKey);

  return (
    <Router>
      <Header />
      {isAuthenticated && <UserOptions user={user} />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:keyword" element={<Products />} />
        <Route path="/search" element={<Search />} />
        <Route path="/login" element={<LoginSignUp />} />
        <Route element={<ProtectedRoute />}>
          {/*------------------------------------------------------------------------------------------------*/}
          <Route element={<Profile />} path="/account" />
          <Route element={<UpdateProfile />} path="/me/update" />
          <Route element={<UpdatePassword />} path="/password/update" />
          <Route element={<Shipping />} path="/shipping" />
          <Route path="/order/confirm" element={<ConfirmOrders />} />
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
          <Route path="/success" element={<OrderSuccess />} />
          <Route path="/orders" element={<MyOrders />} />
          <Route path="/order/:id" element={<OrderDetails />} />
          {/* Admin Routes */}
          <Route
            element={
              <ProtectedAdminRoute role={isAuthenticated && user.role} />
            }
          >
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/products" element={<ProductList />} />
            <Route path="/admin/product" element={<NewProduct />} />
            <Route path="/admin/product/:id" element={<UpdateProduct />} />
            <Route path="/admin/orders" element={<OrderList />} />
            <Route path="/admin/order/:id" element={<OrderProcessing />} />
            <Route path="/admin/users" element={<UsersList />} />
            <Route path="/admin/user/:id" element={<UpdateUser />} />
            <Route path="/admin/reviews" element={<ProductReviews />} />
          </Route>
        </Route>
        {/*----------------------------------------------------------------------------------------------*/}
        <Route element={<ForgotPassword />} path="/password/forgot" />
        <Route element={<ResetPassword />} path="/password/reset/:token" />
        <Route element={<Cart />} path="/cart" />
        <Route element={<NotFound />} path="*" />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
