const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file) {
      cb(null, "public/images");
    }
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
  fileFilter(req, res) {},
});

const upload = multer({ storage: storage });

module.exports = upload;
