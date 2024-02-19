import React from "react";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";

const ProductCard = ({ product }) => {
  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "tomato",
    size: (window.innerWidth < 600) ? 20 : 25,
    value: product.ratings,
    isHalf: true,
  };
  return (
    <Link className="product_card" to={`/product/${product._id}`}>
      <img src={product.image[0].image_url} alt={product.name} />
      <p>{product.name}</p>
      <div className="ratings">
        <ReactStars {...options} /> <span>({product.numOfReviews})</span>
      </div>
      <span>{`₹${product.price}`}</span>
    </Link>
  );
};

export default ProductCard;