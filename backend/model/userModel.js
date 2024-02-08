const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your user name"],
    maxLength: [30, "Name should be less then 30 letters "],
    minLength: [4, "Name should be grater then 4 letters "],
  },
  email: {
    type: String,
    required: [true, "Please enter your email"],
    unique: true,
    validate: [validator.isEmail, "Please enter a valid email"],
  },
  password: {
    type: String,
    required: [true, "Please enter your password"],
    minLength: [8, "password should be grate than 8 character"],
    select: false,
  },
  avatar: {
    public_id: {
      type: String,
      required: true,
    },
    image_url: {
      type: String,
      required: true,
    },
  },
  role: {
    type: String,
    default: "user",
  },
  CreatedAt: {
    type: Date,
    default: Date.now,
  },

  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

//if we update products then paswd will also changesoo we dont want to update the password because its in hash so we do this
userSchema.pre("save", async function (next) {
  //check is the password is updated or not if yes then hash it  ifnot then next()
  if (!this.isModified("password")) {
    // checks if the password is modified or not if yes the exit, else next()
    next();
  }
  this.password = await bcrypt.hash(this.password, 10); //hash the password
});

//JWT token generation
userSchema.methods.getJWTToken = function () {
  //userSchema.methods.getJWTToken: This line adds a method called getJWTToken to the methods object of the userSchema. In Mongoose, methods is a property where you can add instance methods to model instances.
  return jwt.sign({ id: this._id }, process.env.JWT_SECRETE, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

//comparing the passwords of user gave with that in database by hashing the user given password
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

//Getting reset  password token using generating rando bits using crypto
userSchema.methods.getResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(20).toString("hex"); // generated random bits 20 > 2^20 ans in hexadecimal

  //create hash form that resetToken
  this.resetPasswordToken = crypto
    .createHash("sha256") //its an encryption algo so encode in this
    .update(resetToken) //with that algo hash this resetaToken
    .digest("hex"); // show in hexadecimal

  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

  return resetToken;
};

module.exports = mongoose.model("user", userSchema);
