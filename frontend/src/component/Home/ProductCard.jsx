import React from "react";
import { Link } from "react-router-dom";
import { Rating } from "@mui/material";

const ProductCard = ({ product }) => {
  const options = {
    size: "large",
    precision: 0.5,
    readOnly: true,
    value: product.ratings,
  };
  return (
    <Link className="product_card" to={`/product/${product._id}`}>
      <img src={product.image[0].image_url} alt={product.name} />
      <p>{product.name}</p>
      <div className="ratings">
        <Rating {...options} /> <span>({product.numOfReviews})</span>
      </div>
      <span>{`₹${product.price}`}</span>
    </Link>
  );
};

export default ProductCard;
