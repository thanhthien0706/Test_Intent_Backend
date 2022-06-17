const userModel = require("../../../data/models/UserModel");
const md5 = require("md5");

class RegisterController {
  // [POST] /register
  create(req, res) {
    const formData = req.body;

    userModel
      .findOne({ email: formData.email })
      .then((user) => {
        if (user != null) {
          return res.status(200).json({
            message: `User already exists`,
            code: "user_existing",
            success: false,
          });
        } else {
          if (formData.password.length >= 8) {
            formData.password = md5(formData.password);
            const userAccount = new userModel(formData);

            userAccount
              .save()
              .then((user) => {
                res.status(200).json({
                  mess: "Register successfully",
                  code: "registered_success",
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
              message: `Password must be at least 8 characters in length`,
              success: false,
            });
          }
        }
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

module.exports = new RegisterController();
