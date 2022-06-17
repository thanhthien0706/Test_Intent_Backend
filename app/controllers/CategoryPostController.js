const categoryModel = require("../../data/models/CategoryModel");

class CategoryPostController {
  // [POST] /category-post/create
  createCategory(req, res) {
    const formData = req.body;
    const avatar = req.file.filename;

    formData.avatar = `images/${avatar}`;

    const categoryNew = new categoryModel(formData);
    categoryNew
      .save()
      .then(() => {
        res.status(200).json({
          mess: "Create category blog successfully",
          code: "create_category_blog_success",
          success: true,
        });
      })
      .catch((error) => {
        return res.status(500).json({
          message: `Error of server ${error.message}`,
          code: "errour_server",
          success: false,
        });
      });
  }
}

module.exports = new CategoryPostController();
