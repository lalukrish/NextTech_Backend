const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

const app = express();
dotenv.config();

const DevServer = () => {
  app.listen(6000, () => {
    console.log(`server running on port${6000}`);
    mongoose
      .connect(process.env.DEVELOPMENT_DB)
      .then(() => {
        console.log("DevServer connected");
      })
      .catch((error) => {
        console.log(error);
      });
  });
};

DevServer();
console.log("hi");
