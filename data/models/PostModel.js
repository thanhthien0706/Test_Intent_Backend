const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const slug = require("mongoose-slug-generator");

const postSchema = new Schema(
  {
    title: { type: String },
    description: { type: String },
    content: { type: String },
    avatar: { type: String },
    status: { type: String, enum: ["draft", "public"], default: "draft" },
    idUser: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    idCategory: {
      type: mongoose.Types.ObjectId,
      ref: "Category",
    },
    slug: { type: String, slug: "title", unique: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Post", postSchema);
