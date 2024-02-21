import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import MetaData from "../layout/MetaData";
import CheckoutSteps from "./CheckoutSteps";
import "./confirmOrder.css";
import { Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

const ConfirmOrders = () => {
  const navigate = useNavigate();
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);

  const subTotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const shippingCharges = subTotal > 1000 ? 200 : 0;
  const tax = subTotal * 0.18;
  const totalPrice = subTotal + tax + shippingCharges;

  const address = `${shippingInfo.address} , ${shippingInfo.city} , ${shippingInfo.state},${shippingInfo.country}`;

  const proceedToPayment = () => {
    const data = {
      subTotal,
      tax,
      totalPrice,
      shippingCharges,
    };

    sessionStorage.setItem("orderInfo", JSON.stringify(data));
    navigate("/process/payment");
  };

  return (
    <Fragment>
      <MetaData title={"Confirm Order"} />
      <div className="stepper">
        <CheckoutSteps activeSteps={1} />
      </div>
      <div className="confirmOrderPage">
        <div>
          <div className="confirmShippingArea">
            <Typography>Shipping Info</Typography>
            <div className="confirmShippingAreaBox">
              <div>
                <p>Name :</p>
                <span>{user.name}</span>
              </div>
              <div>
                <p>Phone :</p>
                <span>{shippingInfo.phoneNo}</span>
              </div>
              <div>
                <p>Address :</p>
                <span>{address}</span>
              </div>
            </div>
          </div>
          <div className="confirmCartItems">
            <Typography>Your Cart Items</Typography>
            <div className="confirmCartItemsContainer">
              {cartItems &&
                cartItems.map((item) => (
                  <div key={item.product}>
                    <img src={item.image} alt="" />
                    <Link to={`/products${item.product}`}>
                      {item.name}
                    </Link>{" "}
                    <span>
                      {item.quantity} X {item.price} ={" "}
                      <b>{item.quantity * item.price} </b>
                    </span>
                  </div>
                ))}
            </div>
          </div>
        </div>

        {/*  */}
        <div>
          <div className="orderSummary">
            <Typography>Order Summary</Typography>
            <div>
              <div>
                <p>SubTotal</p>
                <span>₹{subTotal}</span>
              </div>
              <div>
                <p>Shipping Charges</p>
                <span>₹{shippingCharges}</span>
              </div>
              <div>
                <p>GST</p>
                <span>₹{tax}</span>
              </div>
            </div>
            <div className="orderSummaryTotal">
              <p>
                <b>Total</b>
              </p>
              <span>₹{totalPrice}</span>
            </div>
            <button onClick={proceedToPayment}>Procees to Payment</button>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ConfirmOrders;
