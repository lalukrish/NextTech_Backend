const express = require("express");

const Admin_Router = require("../Controllers/adminUserController");

const router = express.Router();

router.post("/block-user/:userId", Admin_Router.blockUser);
router.post("/unblock-user/:userId", Admin_Router.unblockUser);
router.post("/make-admin/:userId", Admin_Router.makeAdmin);
router.post("/unmake-admin/:userId", Admin_Router.unmakeAdmin);

module.exports = router;
