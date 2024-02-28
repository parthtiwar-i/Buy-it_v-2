import React, { Fragment, useEffect } from "react";
import "./home.css";
import ProductCard from "./ProductCard";
import MetaData from "../layout/MetaData";
import { useSelector, useDispatch } from "react-redux";
import { clearError, getProduct } from "../../actions/productActions";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";
import front from "./assets/homeVector.svg";

const Home = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { loading, error, products, productCount } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }
    dispatch(getProduct());
  }, [dispatch, error, alert]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="Buy-It" />
          <div className="HomePage">
            <div className="left">
              <h1>Find the NEED!</h1>
              <p>welcome to Buy-it</p>
              <a href="#container">
                <button>
                  Explore 
                </button>
              </a>
            </div>
            <div className="right">
              <img src={front} alt="" />
            </div>
          </div>
          <h2 className="product_heading">Featured! You Would Love!</h2>
          <div className="container" id="container">
            {products &&
              products.map((product) => (
                <ProductCard product={product} key={product._id} />
              ))}
          </div>
        </>
      )}
    </Fragment>
  );
};

export default Home;
