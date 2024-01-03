// const { default: mongoose } = require("mongoose");
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "please enter the name of product"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Please Enter the Product Description"],
  },
  price: {
    type: Number,
    required: [true, "Please Enter the Product Price"],
    maxLength: 8,
  },
  ratings: {
    type: Number,
    default: 0,
  },
  image: [
    {
      public_id: {
        type: String,
        required: true,
      },
      image_url: {
        type: String,
        required: true,
      },
    },
  ],
  catagory: {
    type: String,
    required: [true, "Please enter the catagory of product"],
  },
  stock: {
    type: Number,
    require: [true, "Please entr the stock amount"],
    maxLength: [3, "can't Exceed 4 character"],
    default: 1,
  },
  numOfReviews: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
        requird: true,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("Product", productSchema);
