const express = require("express");

const Admin_Router = require("../Controllers/adminUserController");

router.post("/block-user", Admin_Router.blockUser);
router.post("/unblock-user", Admin_Router.unblockUser);

module.exports = router;