import React, { Fragment } from "react";
import "./cartItemCard.css";
import { Link } from "react-router-dom";

const CartItem = ({ item, deleteItem }) => {
  return (
    <div className="cartItemCard">
      <img src={item.image} alt="jabba" />
      <div>
        <Link to={`/product/${item.product}`}>{item.name} </Link>
        <span>Price : ₹{item.price}</span>
        <p
          onClick={() => {
            deleteItem(item.product);
          }}
        >
          Remove
        </p>
      </div>
    </div>
  );
};

export default CartItem;
