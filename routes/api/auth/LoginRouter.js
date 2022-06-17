const express = require("express");
const router = express.Router();

const loginController = require("../../../app/controllers/auth/LoginController");

// đăng nhập câu a
router.post("/", loginController.index);

module.exports = router;
