const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const validateEmail = function (email) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

const userSchema = new Schema(
  {
    userName: { type: String },
    email: {
      type: String,
      validate: [validateEmail, "Please fill a valid email address"],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
      immutable: true,
    },
    password: {
      type: String,
    },
    age: { type: Number, default: 0 },
    gender: { type: String, default: "male" },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
