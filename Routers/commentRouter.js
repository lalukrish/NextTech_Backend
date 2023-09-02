const express = require("express");

const Comment_Controller = require("../Controllers/commentController");

const router = express.Router();

router.post("/add-comment", Comment_Controller.add_comment);

module.exports = router;
