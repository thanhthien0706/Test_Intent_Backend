const userModel = require("../../data/models/UserModel");
const md5 = require("md5");

class RegisterController {
  // [PUT] /me/update-infor
  updateInfor(req, res) {
    const formData = req.body;
    const idUser = req.userId;
    delete req.body.email;

    if (formData.new_password) {
      if (formData.old_password) {
        userModel
          .findById(idUser)
          .then((user) => {
            if (user.password == md5(formData.old_password)) {
              formData.password = md5(formData.new_password);

              userModel
                .updateOne({ _id: idUser }, formData)
                .then(() => {
                  res.status(200).json({
                    mess: "Update infor successfully",
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
              return res.status(404).json({
                message: `Old password not exist`,
                code: "old_password_not_exist",
                success: false,
              });
            }
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
          message: `You must have old_password and new_password to change a password`,
          success: false,
        });
      }
    } else {
      userModel
        .updateOne({ _id: idUser }, formData)
        .then(() => {
          res.status(200).json({
            mess: "Update infor successfully",
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

module.exports = new RegisterController();
