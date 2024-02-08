const app = require("./app");
const dotenv = require("dotenv");
const cloudinary = require("cloudinary");
const connectDatabase = require("./config/database");

//handling uncaught error
process.on("uncaughtException", (err) => {
  console.log(`Error : ${err.message}`);
  console.log(`shutting down the server uncaught error occured`);
  process.exit(1);
});

//config
dotenv.config({ path: "backend/config/config.env" });
//connection to database
connectDatabase();
//Cloudinary connection
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRETE,
  secure: true,
});

//server listen
const server = app.listen(process.env.PORT, () => {
  console.log(`server in running on port a : ${process.env.PORT}`);
});

//handling unhandeled promise rejection error
process.on("unhandledRejection", (err) => {
  console.log(`Error : ${err.message}`);
  console.log("Shutting down the server due to unhandeled promise rejection");

  server.close(() => {
    process.exit(1);
  });
});
