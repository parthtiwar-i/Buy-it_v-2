const Product = require("../model/productModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const ApiFeatures = require("../utils/features");
const cloudinary = require("cloudinary");

//create product in the APP --> ADMIN
exports.createProduct = catchAsyncError(async (req, res, next) => {
  let images = [];
  if (typeof req.body.images === "string") {
    images.push(req.body.image);
  } else {
    images = req.body.image;
  }

  let imagesLink = [];

  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.v2.uploader.upload(images[i], {
      folder: "Products",
    });

    imagesLink.push({
      public_id: result.public_id,
      image_url: result.secure_url,
    });
  }

  req.body.image = imagesLink;
  req.body.user = req.user.id;
  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    product,
  });
});

//Get All Products
exports.getAllProducts = catchAsyncError(async (req, res) => {
  const resultPerPage = 8;
  const productsCount = await Product.countDocuments();
  const apiFeatures = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter();
  let products = await apiFeatures.query;
  let productsNum = products.length;
  apiFeatures.pagination(resultPerPage);
  products = await apiFeatures.query.clone();
  res.status(200).json({
    success: true,
    products,
    productsCount,
    resultPerPage,
    productsNum,
  });
});

//ADMIN ----->Get All Products
exports.getAdminProducts = catchAsyncError(async (req, res) => {
  const products = await Product.find();

  res.status(200).json({
    success: true,
    products,
  });
});

//Get Single Product Details
exports.getProductDetail = catchAsyncError(async (req, res, next) => {
  // next(new ErrorHandler("again that fuckin errror", 500)); for error checking
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }
  res.json({
    success: true,
    product,
  });
});

//Update product --> ADMIN

exports.updateProduct = catchAsyncError(async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    next(new ErrorHandler("product not found", 404));
  }

  //images to update
  if (req.body.image) {
    let images = [];
    if (typeof req.body.images === "string") {
      images.push(req.body.image);
    } else {
      images = req.body.image;
    }

    //delete the existing images
    if (images !== undefined) {
      for (let i = 0; i < product.image.length; i++) {
        await cloudinary.v2.uploader.destroy(product.image[i].public_id);
      }
    }

    //uplode the new images
    let imagesLink = [];

    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.v2.uploader.upload(images[i], {
        folder: "Products",
      });

      imagesLink.push({
        public_id: result.public_id,
        image_url: result.secure_url,
      });
    }

    req.body.image = imagesLink;
  }

  product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
    product,
  });
});

//Delete Product --> ADMIN
exports.deleteProduct = catchAsyncError(async (req, res, next) => {
  const p_id = req.params.id;

  const productImg = await Product.findOne({ _id: p_id });
  if (!productImg) {
    return next(new ErrorHandler("product not found", 404));
  }

  for (let i = 0; i < productImg.image.length; i++) {
    await cloudinary.v2.uploader.destroy(productImg.image[i].public_id);
  }

  const product = await Product.deleteOne({ _id: p_id });

  if (product.deletedCount === 0) {
    // If product is not found, return an error response
    return next(new ErrorHandler("product not found", 404));
  }
  // Respond with a success message
  res.status(200).json({
    success: true,
    msg: "Product deleted successfully",
  });
});

//CREATE NEW REVIEW OR UPDATE REVIEW

exports.createProductReview = catchAsyncError(async (req, res, next) => {
  const { rating, comment, productId } = req.body;
  const review = {
    user: req.user.id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  const product = await Product.findById(productId);

  const isReviwed = product.reviews.find(
    (rev) => rev.user.toString() === req.user.id.toString()
  );

  if (isReviwed) {
    product.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user.id.toString()) {
        rev.rating = rating;
        rev.comment = comment;
      }
    });
  } else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }

  let avg = 0;
  product.reviews.forEach((rev) => {
    avg += rev.rating;
  });
  product.ratings = avg / product.reviews.length;

  await product.save({ validateBeforeSave: false });
  res.status(200).json({
    success: true,
  });
});

//Get All reviews of product

exports.getAllReviews = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.query.id);
  if (!product) {
    return next(new ErrorHandler("Product not found", 400));
  }

  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});

//Delete Product Reviews

exports.deleteReviews = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);
  if (!product) {
    return next(new ErrorHandler("Product not found", 400));
  }

  const reviews = product.reviews.filter(
    (rev) => rev._id.toString() !== req.query.id.toString()
  );
  let avg = 0;

  reviews.forEach((rev) => {
    avg += rev.rating;
  });

  let ratings = 0;
  if (reviews.length == 0) {
    ratings = 0;
  } else {
    ratings = avg / reviews.length;
  }
  const numOfReviews = reviews.length;

  await Product.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      ratings,
      numOfReviews,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
  });
});
