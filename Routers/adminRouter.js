const express = require("express");

const Admin_Router = require("../Controllers/adminUserController");

const router = express.Router();

router.post("/block-user/:userId", Admin_Router.blockUser);
router.post("/unblock-user/:userId", Admin_Router.unblockUser);

module.exports = router;
