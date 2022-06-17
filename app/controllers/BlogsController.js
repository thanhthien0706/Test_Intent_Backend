const postModel = require("../../data/models/PostModel");
const mongoose = require("mongoose");

class BlogsController {
  // [POST] /blogs/me/create
  createBlog(req, res) {
    const formData = req.body;
    const idUser = req.userId;
    const avatar = req.file.filename;

    if (avatar) {
      formData.avatar = `images/${avatar}`;
      formData.idUser = idUser;

      const postModelNew = new postModel(formData);

      postModelNew
        .save()
        .then(() => {
          res.status(200).json({
            mess: "Create blog successfully",
            code: "create_blog_success",
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

  // [GET] /blogs/me/get-post
  getPost(req, res) {
    const statusPost = req.query.status.toLowerCase();
    const idUser = req.userId;

    if (statusPost && statusPost != "all") {
      postModel
        .aggregate([
          {
            $match: {
              idUser: new mongoose.Types.ObjectId(idUser),
              status: { $eq: statusPost },
            },
          },
          {
            $lookup: {
              from: "users",
              localField: "idUser",
              foreignField: "_id",
              as: "dataAuthor",
            },
          },
          {
            $lookup: {
              from: "categories",
              localField: "idCategory",
              foreignField: "_id",
              as: "dataCategory",
            },
          },
        ])
        .then((docs) => {
          res.status(200).json({
            message: `Get blog`,
            data: docs,
            code: "get_blog",
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
    } else if (statusPost && statusPost == "all") {
      postModel
        .aggregate([
          {
            $match: {
              idUser: new mongoose.Types.ObjectId(idUser),
            },
          },
          {
            $lookup: {
              from: "users",
              localField: "idUser",
              foreignField: "_id",
              as: "dataAuthor",
            },
          },
          {
            $lookup: {
              from: "categories",
              localField: "idCategory",
              foreignField: "_id",
              as: "dataCategory",
            },
          },
        ])
        .then((docs) => {
          res.status(200).json({
            message: `Get all blog`,
            data: docs,
            code: "get_all",
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
    } else {
      return res.status(400).json({
        message: `You must enter the status field`,
        success: false,
      });
    }
  }

  // [PUT] /blogs/me/update-blog/:idUser
  updateBlog(req, res) {
    const formData = req.body;
    const idBlog = req.params.idBlog;

    if (req.file) {
      formData.avatar = `images/${req.file.filename}`;
    }
    postModel
      .updateOne({ _id: idBlog }, formData)
      .then(() => {
        res.status(200).json({
          mess: "Update post successfully",
          code: "update_post_success",
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

  // [PUT] /blogs/me/update-stutus/:idBlog
  updateStatusBlog(req, res) {
    const statusPost = req.query.status.toLowerCase();
    const idBlog = req.params.idBlog;

    if (statusPost) {
      postModel
        .updateOne(
          { _id: idBlog },
          {
            status: statusPost,
          }
        )
        .then(() => {
          res.status(200).json({
            mess: "Update status post successfully",
            code: "update_status_post_success",
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

  // [DELETE] /blogs/me/:idBlog/delete
  deleteBlog(req, res) {
    const idBlog = req.params.idBlog;

    postModel
      .findByIdAndDelete(idBlog)
      .then(() => {
        res.status(200).json({
          mess: "Delete post successfully",
          code: "delete_post_success",
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

  // [GET] /blogs/:idCategory
  allBlogWithIdCategory(req, res) {
    const idCategoryBlog = req.params.idCategory;
    if (idCategoryBlog) {
      postModel
        .aggregate([
          {
            $match: {
              idCategory: new mongoose.Types.ObjectId(idCategoryBlog),
            },
          },
          {
            $lookup: {
              from: "categories",
              localField: "idCategory",
              foreignField: "_id",
              as: "dataCategory",
            },
          },
        ])
        .then((docs) => {
          res.status(200).json({
            message: `Get blog`,
            data: docs,
            code: "get_blog",
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
}

module.exports = new BlogsController();
