const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const slug = require("mongoose-slug-generator");

const categorySchema = new Schema(
  {
    name: { type: String },
    avatar: { type: String },
    slug: { type: String, slug: "name", unique: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Category", categorySchema);
