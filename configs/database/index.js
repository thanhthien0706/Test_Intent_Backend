const mongoose = require("mongoose");

async function connectDatabase() {
  try {
    await mongoose.connect("mongodb://localhost:27017/InternChuongHai", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connect mongo successfully ");
  } catch (e) {
    console.log("Connect mongo failed: " + e.message);
  }
}

module.exports = connectDatabase;
