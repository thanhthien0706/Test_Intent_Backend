const { getToken, verifyToken } = require("../../utils/handleToken");

module.exports = {
  async checkLogin(req, res, next) {
    const token = getToken(req.headers);

    if (token === null) {
      return res.status(403).json({
        code: "no_token",
        message: "No token provided!",
        success: false,
      });
    }

    let data = await verifyToken(token);

    if (data === null) {
      return res.status(403).json({
        code: "no_verify_token",
        message: "No verify token provided!",
        success: false,
      });
    } else {
      req.userId = data.id;
      next();
    }
  },
};
