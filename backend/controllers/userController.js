const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const User = require("../model/userModel");
const sendToken = require("../utils/JWTToken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
const cloudinary = require("cloudinary");

//REGISTER A USER

exports.registerUser = catchAsyncError(async (req, res, next) => {
  const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
    folder: "avatars",
    width: 150,
    crop: "scale",
  });

  const { name, email, password } = req.body;
  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: myCloud.public_id,
      image_url: myCloud.secure_url,
    },
  });

  sendToken(user, 201, res);
});

//LOGIN USER

exports.loginUser = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler("Please enter email and password", 400));
  }

  const user = await User.findOne({ email }).select("+password");
  // because we have done (select:false) for password, so to get password also from query result we did this
  if (!user) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  sendToken(user, 200, res);
});

//LOGOUT USER

exports.logoutUser = catchAsyncError(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged Out ",
  });
});

//Fortgot Password
exports.forgotPassword = catchAsyncError(async (req, res, next) => {
  //find user
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(
      new ErrorHandler("User not found please enter valid email", 404)
    );
  }

  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  const resetPasswordUrl = `${req.protocol}://${req.get(
    "host"
  )}password/reset/${resetToken}`;
  const message = `your reset password link is below click it to reset your password \n\n ${resetPasswordUrl} \n\n If you have not requested this email then please ignore`;

  try {
    await sendEmail({
      email: user.email,
      subject: "Buy-It password reset",
      message,
    });

    res.status(200).json({
      success: true,
      message: `password reset link send to ${user.email} sccessfully`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    return next(new ErrorHandler(`internal server error ${error}`, 500));
  }
});

//RESET PASSWORD

exports.resetPassword = catchAsyncError(async (req, res, next) => {
  console.log("inside reset password");
  //creating token hash
  const resetPasswordToken = crypto
    .createHash("sha256") //its an encryption algo so encode in this
    .update(req.params.token) //with that algo hash this resetaToken
    .digest("hex"); // show in hexadecimal

  console.log(resetPasswordToken);

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  console.log("user is : ", user);

  if (!user) {
    return next(new ErrorHandler("user not found", 400));
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(
      new ErrorHandler(" confirm password and password should be same ", 400)
    );
  }

  user.password = req.body.password;
  user.resetPasswordExpire = undefined;
  user.resetPasswordToken = undefined;

  await user.save();

  sendToken(user, 200, res);
});

//GET USER DETAILS

exports.getUserDetail = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  res.status(200).json({
    success: true,
    user,
  });
});

//UPDATE PASSWORD

exports.updatePassword = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");

  const isPasswordMatched = await user.comparePassword(req.body.oldPassword);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Please enter correct old password", 400));
  }

  if (req.body.newPassword !== req.body.confirmPassword) {
    return next(
      new ErrorHandler(
        " Password doesn't matched, Please enter correct Confirm Password",
        400
      )
    );
  }

  user.password = req.body.newPassword;
  await user.save();

  sendToken(user, 200, res);
});

// UPDATE PROFILE
exports.updateProfile = catchAsyncError(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
  };

  if (req.body.avatar != " ") {
    const user = await User.findById(req.user.id);
    imageId = user.avatar.public_id;
    await cloudinary.v2.uploader.destroy(imageId);

    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
      folder: "avatars",
      width: 150,
      crop: "scale",
    });

    newUserData.avatar = {
      public_id: myCloud.public_id,
      image_url: myCloud.secure_url,
    };
  }

  const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
  });
});

//ADMIN ROUTE  get all user

exports.getAllUser = catchAsyncError(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    success: true,
    users,
  });
});

//ADMIN ROUTE  get single user details

exports.getSingleUser = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(new ErrorHandler("no user found", 400));
  }
  res.status(200).json({
    success: true,
    user,
  });
});

//ADMIN ROUTE - update user role

exports.updateUserRole = catchAsyncError(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };
  const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  if (!user) {
    return next(new ErrorHandler("user not found ", 400));
  }

  res.status(200).json({
    success: true,
  });
});

//ADMIN ROUTE -- delete user

exports.deleteUser = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorHandler("User doesnt exist with id " + req.params.id, 400)
    );
  }

  if (req.body.avatar != " ") {
    const user = await User.findById(req.user.id);
    imageId = user.avatar.public_id;
    await cloudinary.v2.uploader.destroy(imageId);
  }
  await user.deleteOne();

  res.status(200).json({
    success: true,
    message: "user deleted successfully",
  });
});
