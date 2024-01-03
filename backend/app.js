const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const errorMiddleware = require("./middleware/error");
app.use(express.json());
app.use(cookieParser());

//route import
const product = require("./routes/productRoute");
const user = require("./routes/userRoute");
//using the routes as middeware as express is a middleware lib basically
app.use("/api/v1", product);
app.use("/api/v1", user);

//error handling middleware
app.use(errorMiddleware);

module.exports = app;
