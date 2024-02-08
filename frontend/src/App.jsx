import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "./component/layout/Header/Header";
import Footer from "./component/layout/Footer/Footer";
import Home from "./component/Home/Home.jsx";
import ProductDetails from "./component/Product/ProductDetails";
import Products from "./component/Product/Products.jsx";
import Search from "./component/Product/Search.jsx";
import LoginSignUp from "./component/user/LoginSignUp.jsx";
import { useEffect } from "react";
import store from "./store.js";
import { loadUser } from "./actions/userActions.js";
import { useSelector } from "react-redux";
import UserOptions from "./component/layout/Header/UserOptions"
import Profile from "./component/user/Profile";
import ProtectedRoute from "./component/Route/ProtectedRoute.jsx";


function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  useEffect(() => {
      store.dispatch(loadUser());
    
  }, []);

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
        <Route element={<ProtectedRoute/>}  >
          <Route element={<Profile/>}  path="/account" />
        </Route>
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
