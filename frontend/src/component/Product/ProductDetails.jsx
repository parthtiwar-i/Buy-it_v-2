import React, { Fragment, useEffect, useState } from "react";
import "./productDetails.css";
import Carousel from "react-material-ui-carousel";
import { useSelector, useDispatch } from "react-redux";
import {
  clearError,
  getProductDetails,
  newReview,
} from "../../actions/productActions";
import { useParams } from "react-router-dom";
import ReviewCard from "./reviewCard";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData";
import { addItemToCart } from "../../actions/cartActions";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Rating,
} from "@mui/material";
import { NEW_REVIEW_RESET } from "../../constants/productConstants";

const ProductDetails = () => {
  const { id } = useParams();
  const alert = useAlert();
  const dispatch = useDispatch();
  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );
  const { success, error: reviewError } = useSelector(
    (state) => state.newReview
  );

  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState(" ");

  const submitReviewToggle = () => {
    open ? setOpen(false) : setOpen(true);
  };

  const reviewSubmitHandler = () => {
    const myForm = new FormData();
    myForm.set("rating", rating);
    myForm.set("comment", comment);
    myForm.set("productId", id);

    dispatch(newReview(myForm));
    setOpen(false);
  };
  const [quantity, setQuantity] = useState(1);
  const increaseQuantity = () => {
    let qty = parseInt(quantity) + 1;
    if (qty > product.stock) {
      setQuantity(product.stock);
    } else setQuantity(qty);
  };
  const decreaseQuantity = () => {
    let qty = parseInt(quantity) - 1;
    if (qty < 1) {
      setQuantity(1);
    } else setQuantity(qty);
  };

  const handleAddToCart = () => {
    dispatch(addItemToCart(product._id, quantity));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearError);
    }
    if (reviewError) {
      alert.error(reviewError);
      dispatch(clearError);
    }
    if (success) {
      alert.success("New Review Submitted");
      dispatch({
        type: NEW_REVIEW_RESET,
      });
    }
    dispatch(getProductDetails(id));
  }, [dispatch, id, error, alert, success, reviewError]);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleThumbnailClick = (index) => {
    setCurrentImageIndex(index);
  };

  const options = {
    value: product.ratings,
    size: "large",
    precision: 0.5,
    readOnly: true,
  };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={`${product.name} --BuyIt`} />
          <div className="productDetails">
            <div className="carouselContainer">
              <Carousel
                index={currentImageIndex}
                onChange={(index) => setCurrentImageIndex(index)}
                className="images"
                height={450}
                sx={
                  {
                    // background: "gray",
                    // width: "100%",
                  }
                }
              >
                {product.image &&
                  product.image.map((image, i) => (
                    <img
                      className="CarouselImage"
                      key={image.image_url}
                      src={image.image_url}
                      alt={`${i} Slide`}
                    />
                  ))}
              </Carousel>
              <div className="imageStrip">
                {product.image &&
                  product.image.map((image, i) => (
                    <img
                      key={image.image_url}
                      src={image.image_url}
                      alt={`Thumbnail ${i}`}
                      className={`thumbnail ${
                        currentImageIndex === i ? "selected" : ""
                      }`}
                      onClick={() => handleThumbnailClick(i)}
                    />
                  ))}
              </div>
            </div>
            <div className="details">
              <div className="detailBlock-1">
                <h2>{product.name}</h2>
                {/* <p>{product._id}</p> */}
              </div>
              <div className="detailBlock-2">
                <Rating {...options} />

                <span> ({product.numOfReviews} )</span>
              </div>
              <div className="detailBlock-3">
                <h1>{`₹${product.price}`}</h1>
                <div className="detailBlock-3-1">
                  <div className="detailBlock-3-1-1">
                    <button onClick={decreaseQuantity}>-</button>
                    <input type="number" readOnly value={quantity} />
                    <button onClick={increaseQuantity}>+</button>
                  </div>
                  <button
                    disabled={product.stock < 1 ? true : false}
                    onClick={handleAddToCart}
                  >
                    Add To Cart
                  </button>
                </div>
                <p>
                  Status :
                  <b className={product.stock < 1 ? "redColor" : "greenColor"}>
                    {product.stock < 1 ? " Out Of Stock" : " In Stock"}
                  </b>
                </p>
              </div>
              <div className="detailBlock-4">
                <div className="description">
                  <h3>Description:</h3>
                  <p>{product.description}</p>
                </div>
                <button onClick={submitReviewToggle}>Add Reviews</button>
              </div>
            </div>
          </div>

          <h3 className="Review">Reviews</h3>
          <Dialog
            aria-labelledby="simple_diaglog-title"
            open={open}
            onClose={submitReviewToggle}
          >
            <DialogTitle>Submit Review</DialogTitle>
            <DialogContent className="submitDialog">
              <Rating
                onChange={(e) => setRating(e.target.value)}
                value={rating}
                size="large"
              />
              <textarea
                className="submitDialogTextArea"
                cols="30"
                rows="5"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
            </DialogContent>
            <DialogActions>
              <Button onClick={submitReviewToggle} color="secondary">
                Cancle
              </Button>
              <Button onClick={reviewSubmitHandler}>Submit</Button>
            </DialogActions>
          </Dialog>

          {product.reviews && product.reviews[0] ? (
            <div className="product-reviews">
              {product.reviews.map((review) => (
                <ReviewCard review={review} key={review.user} />
              ))}
            </div>
          ) : (
            <p className="noReviews">No Reviews Yet</p>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default ProductDetails;
