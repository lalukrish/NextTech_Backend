const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const adminRouter = require("./Routers/adminRouter");
const app = express();
const multer = require("multer");
const path = require("path");

const userRouter = require("./Routers/userRouter");
const commentRouter = require("./Routers/commentRouter");
const bodyParser = require("body-parser");

dotenv.config();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const storage = multer.diskStorage({
  destination: path.join(__dirname, "uploads"),
  filename: (req, file, cb) => {
    cb(null, new Date().getTime() + path.extname(file.originalname)); // Define the filename for stored files
  },
});
app.use(multer({ storage }).single("image"));
app.use("/", userRouter);
app.use("/admin", adminRouter);
app.use("/comments", commentRouter);
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
