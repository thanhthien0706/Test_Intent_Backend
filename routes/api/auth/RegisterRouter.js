const express = require("express");
const router = express.Router();

const registerController = require("../../../app/controllers/auth/RegisterController");

// đăng kí câu a
router.post("/", registerController.create);

module.exports = router;
