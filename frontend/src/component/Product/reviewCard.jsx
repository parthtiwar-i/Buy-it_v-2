import React from "react";
import profileImg from "../../images/user_acc.png";
import { Rating } from "@mui/material";
const ReviewCard = ({ review }) => {
  const options = {
    value: review.rating,
    size: "large",
    precision: 0.5,
    readOnly: true,
  };
  return (
    <div className="reviewCard">
      <img src={profileImg} alt="user" />
      <p>{review.name}</p>
      <Rating {...options} />
      <p>{review.comment}</p>
    </div>
  );
};

export default ReviewCard;
