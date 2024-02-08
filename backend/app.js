const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUploder = require("express-fileupload");
const app = express();
const errorMiddleware = require("./middleware/error");
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUploder());
app.use(cookieParser());

//route import
const product = require("./routes/productRoute");
const user = require("./routes/userRoute");
const order = require("./routes/orderRoute");
//using the routes as middeware as express is a middleware lib basically
app.use("/api/v1", product); // product routes
app.use("/api/v1", user); //user routes
app.use("/api/v1", order); //order routes

//error handling middleware
app.use(errorMiddleware);

module.exports = app;
