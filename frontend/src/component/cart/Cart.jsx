import React, { Fragment } from "react";
import "./cart.css";
import CartItem from "./CartItem";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart, removeItemFromCart } from "../../actions/cartActions";
import { useAlert } from "react-alert";
import { Link, useNavigate } from "react-router-dom";
import RemoveShoppingCartRoundedIcon from "@mui/icons-material/RemoveShoppingCartRounded";

const Cart = () => {
  const navigate = useNavigate();
  const alert = useAlert();
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);

  const increaseQuantity = (id, quantity, stock) => {
    const newQty = quantity + 1;
    if (quantity >= stock) return;
    dispatch(addItemToCart(id, newQty));
  };
  const decreaseQuantity = (id, quantity) => {
    const newQty = quantity - 1;
    if (quantity <= 1) return;
    dispatch(addItemToCart(id, newQty));
  };
  const deleteItemFromCart = (id) => {
    dispatch(removeItemFromCart(id));
    alert.success("Item removed from cart");
  };
  const checkOutHandler = () => {
    navigate("/login?redirect=shipping");
  };
  return (
    <Fragment>
      {cartItems.length == 0 ? (
        <div className="noProduct">
          <RemoveShoppingCartRoundedIcon fontSize="large" />
          <h1>"No Items In The Cart SHOP NOW!"</h1>
          <Link to={"/products"}>View Products</Link>
        </div>
      ) : (
        <Fragment>
          <div className="cartPage">
            <div className="cartHeader">
              <p>Product</p>
              <p>Quantity</p>
              <p>Subtotal</p>
            </div>

            {cartItems &&
              cartItems.map((item, i) => (
                <div className="cartContainer" key={i}>
                  <CartItem item={item} deleteItem={deleteItemFromCart} />
                  <div className="cartInput">
                    <button
                      onClick={() => {
                        decreaseQuantity(item.product, item.quantity);
                      }}
                    >
                      -
                    </button>
                    <input type="number" readOnly value={item.quantity} />
                    <button
                      onClick={() => {
                        increaseQuantity(
                          item.product,
                          item.quantity,
                          item.stock
                        );
                      }}
                    >
                      +
                    </button>
                  </div>
                  <p className="cartSubTotal">₹{item.price * item.quantity}</p>
                </div>
              ))}
            <div className="grossTotal">
              <div></div>
              <div className="grossTotalBox">
                <p>Gross Total</p>
                <p>{`₹${cartItems.reduce(
                  (acc, item) => acc + item.quantity * item.price,
                  0
                )}`}</p>
              </div>
              <div></div>
              <div className="checkOutBtn">
                <button onClick={checkOutHandler}>CheckOut</button>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Cart;
