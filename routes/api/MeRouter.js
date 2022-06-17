const express = require("express");
const router = express.Router();

const meController = require("../../app/controllers/MeController");

// câu b
router.put("/update-infor", meController.updateInfor);

module.exports = router;
