import React, { Fragment, useEffect } from "react";
import "./home.css";
import Product from "./Product";
import MouseIcon from "@mui/icons-material/MouseOutlined";
import MetaData from "../layout/MetaData";
import { useSelector, useDispatch } from "react-redux";
import { getProduct } from "../../actions/productActions";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";

const Home = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { loading, error, products, productCount } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    if (error) {
      return alert.error(error);
    }
    dispatch(getProduct());
  }, [dispatch, error, alert]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="Parth- Tiwari" />
          <div className="HomePage">
            <h1>Explore the NEED!</h1>
            <p>welcome to Buy-it</p>
            <a href="#container">
              <button>
                Scroll <MouseIcon />{" "}
              </button>
            </a>
          </div>
          <h2 className="product_heading">Products You Would Love!</h2>
          <div className="container" id="container">
            {products &&
              products.map((product) => (
                <Product product={product} key={product._id} />
              ))}
          </div>
        </>
      )}
    </Fragment>
  );
};

export default Home;
