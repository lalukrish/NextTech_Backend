const express = require("express");

const Comment_Controller = require("../Controllers/commentController");

const router = express.Router();

router.post("/add-comment", Comment_Controller.add_comment);
router.get("/get-comment/:post", Comment_Controller.get_comment);
router.post("/add-reply", Comment_Controller.add_reply);

module.exports = router;
