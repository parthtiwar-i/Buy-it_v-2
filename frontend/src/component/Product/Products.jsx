import React, { Fragment, useEffect, useState } from "react";
import "./products.css";
import { useSelector, useDispatch } from "react-redux";
import { getProduct, clearError } from "../../actions/productActions";
import ProductCard from "../Home/ProductCard";
import Loader from "../layout/Loader/Loader";
import { useParams } from "react-router-dom";
import { Pagination, Slider, Typography } from "@mui/material";
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData";

const catagories = ["pants", "shoes", "laptop", "Shirt", "Phone"];

const Products = () => {
  const alert = useAlert();
  const [currentPage, setcurrentPage] = useState(1);
  const [catagory, setcatagory] = useState();
  const [price, setprice] = useState([0, 25000]);
  const [rating, setrating] = useState(0);
  const { keyword } = useParams();
  const dispatch = useDispatch();
  const {
    products,
    loading,
    error,
    productsCount,
    resultPerPage,
    productsNum,
  } = useSelector((state) => state.products);

  //use effeect

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }
    dispatch(getProduct(keyword, currentPage, price, catagory, rating));
  }, [dispatch, keyword, currentPage, price, catagory, rating,alert , error]);

  const setCurrentPageNo = (e, page) => {
    setcurrentPage(page);
  };
  const priceHandler = (event, value) => {
    setprice(value);
  };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={"Products"}/>
          <h1 className="ProductHeading">Products</h1>

          <div className="filterProduct">
            <Typography>Price</Typography>
            <Slider
              size="small"
              // aria-aria-label="Price"
              step={500}
              min={0}
              max={25000}
              // getAriaLabel={() => "Temperature range"}
              value={price}
              onChange={priceHandler}
              valueLabelDisplay="auto"
              getAriaValueText={() => "Price"}
            />
            <Typography>Catagory</Typography>
            <ul className="catagory-filter">
              {catagories.map((catagory) => (
                <ul
                  key={catagory}
                  className="catagory-link"
                  onClick={() => setcatagory(catagory)}
                >
                  {catagory}
                </ul>
              ))}
            </ul>
            <div className="ratings">
              <Typography component="legend">Ratings</Typography>
              <Slider
                value={rating}
                onChange={(e, newRating) => {
                  setrating(newRating);
                }}
                aria-label="Default"
                valueLabelDisplay="auto"
                min={0}
                max={5}
                size="small"
              ></Slider>
            </div>
          </div>
          <div className="product-container">
            {products &&
              products.map((product) => (
                <ProductCard product={product} key={product._id} />
              ))}
          </div>
          <div className="pagination">
            {productsNum > resultPerPage && (
              <Pagination
                count={Math.ceil(productsCount / resultPerPage)}
                onChange={setCurrentPageNo}
                page={currentPage}
                variant="outlined"
                color="primary"
                shape="rounded"
              />
            )}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Products;