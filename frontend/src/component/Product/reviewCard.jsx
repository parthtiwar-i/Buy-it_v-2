import React from "react";
import ReactStars from "react-rating-stars-component";
import profileImg from "../../images/user_acc.png";
const ReviewCard = ({ review }) => {
  const options = {
    value: review.rating,
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "tomato",
    size: window.innerWidth < 600 ? 20 : 25,
    isHalf: true,
  };
  return (
    <div className="reviewCard">
      <img src={profileImg} alt="user" />
      <p>{review.name}</p>
      <ReactStars {...options} />
      <p>{review.comment}</p>
    </div>
  );
};

export default ReviewCard;
