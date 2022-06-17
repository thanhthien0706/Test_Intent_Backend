const express = require("express");
const router = express.Router();

const upload = require("../../app/middlewares/uploadMiddleware");

const categoryPostController = require("../../app/controllers/CategoryPostController");

// tạo thể loại của bài viết
router.post(
  "/create",
  upload.single("avatar"),
  categoryPostController.createCategory
);

module.exports = router;
