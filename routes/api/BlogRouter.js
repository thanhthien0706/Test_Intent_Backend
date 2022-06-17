const express = require("express");
const router = express.Router();

const { checkLogin } = require("../../app/middlewares/checkAccount");
const upload = require("../../app/middlewares/uploadMiddleware");

const blogsController = require("../../app/controllers/BlogsController");

// câu d
router.post(
  "/me/create",
  checkLogin,
  upload.single("avatar"),
  blogsController.createBlog
);

// câu c
router.get("/me/get-post", checkLogin, blogsController.getPost);

// câu e
router.put(
  "/me/update-blog/:idBlog",
  checkLogin,
  upload.single("avatar"),
  blogsController.updateBlog
);

// câu f
router.put(
  "/me/update-status/:idBlog",
  checkLogin,
  blogsController.updateStatusBlog
);

// câu g
router.delete("/me/:idBlog/delete", checkLogin, blogsController.deleteBlog);

// câu h
router.get("/:idCategory", blogsController.allBlogWithIdCategory);

module.exports = router;
