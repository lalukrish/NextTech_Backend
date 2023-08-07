const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const userRouter = require("./Routers/userRouter");
const adminRouter = require("./Routers/adminRouter");
const bodyParser = require("body-parser");
const AdminRouter = require("./Controllers/adminUserController");

dotenv.config();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/", userRouter);
app.use("/admin", adminRouter);
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
