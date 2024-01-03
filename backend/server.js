const app = require("./app");
const dotenv = require("dotenv");
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
const server = app.listen(process.env.PORT, () => {
  console.log(`server in running on port : ${process.env.PORT}`);
});

//handling unhandeled promise rejection error
process.on("unhandledRejection", (err) => {
  console.log(`Error : ${err.message}`);
  console.log("Shutting down the server due to unhandeled promise rejection");

  server.close(() => {
    process.exit(1);
  });
});
