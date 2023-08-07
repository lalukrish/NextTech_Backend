const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const userRouter = require("../NextTech_Backend/Routers/userRouter");
const app = express();
const bodyParser = require("body-parser");

dotenv.config();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/", userRouter);
//app.use("/admin");
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
