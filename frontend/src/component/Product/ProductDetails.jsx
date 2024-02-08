import React, { Fragment, useEffect, useState } from "react";
import "./productDetails.css";
import Carousel from "react-material-ui-carousel";
import { useSelector, useDispatch } from "react-redux";
import { clearError, getProductDetails } from "../../actions/productActions";
import { useParams } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import ReviewCard from "./reviewCard";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData";

const ProductDetails = () => {
  const { id } = useParams();
  const alert = useAlert();
  const dispatch = useDispatch();
  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearError);
    }
    dispatch(getProductDetails(id));
  }, [dispatch, id, error , alert]);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleThumbnailClick = (index) => {
    setCurrentImageIndex(index);
  };

  const options = {
    value: product.rating,
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "tomato",
    size: window.innerWidth < 600 ? 20 : 25,
    isHalf: true,
  };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={`${product.name} --BuyIt`}/>
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
                <ReactStars {...options} />
                <span>({product.numOfReviews})</span>
              </div>
              <div className="detailBlock-3">
                <h1>{`₹${product.price}`}</h1>
                <div className="detailBlock-3-1">
                  <div className="detailBlock-3-1-1">
                    <button>-</button>
                    <input type="number" defaultValue="1" />
                    <button>+</button>
                  </div>
                  <button>Add To Cart</button>
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
                <button>Add Reviews</button>
              </div>
            </div>
          </div>

          <h3 className="Review">Reviews</h3>
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
