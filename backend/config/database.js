const mongoose = require("mongoose");

const connectDataBase = () => {
  mongoose.connect(process.env.DB_URI).then((data) => {
    console.log(`server is running in the port  ${data.connection.host}`);
  });
};

module.exports = connectDataBase;
