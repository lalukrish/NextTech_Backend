const express = require("express");

const Comment_Controller = require("../Controllers/commentController");

const router = express.Router();

router.post("/add-comment", Comment_Controller.add_comment);
router.get("/get-comment/:post", Comment_Controller.get_comment);
router.post("/add-reply", Comment_Controller.add_reply);
router.post("/add-like", Comment_Controller.add_like);
router.get("/get-all-likes/:postId", Comment_Controller.get_no_of_like);

module.exports = router;
