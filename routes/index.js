const express = require("express");
const router = express.Router();

const registerRouter = require("./api/auth/RegisterRouter");
const loginRouter = require("./api/auth/LoginRouter");
const meRouter = require("./api/MeRouter");
const blogRouter = require("./api/BlogRouter");
const categoryPostRouter = require("./api/CategoryPostRouter");

/**
 * MIDDLEWAREs
 */
const { checkLogin } = require("../app/middlewares/checkAccount");

// set name router api
function route(app) {
  app.use("/api", router);
}

/**
 * ROUTER
 */
router.use("/register", registerRouter);
router.use("/login", loginRouter);
router.use("/me", checkLogin, meRouter);
router.use("/blogs", blogRouter);
router.use("/category-post", categoryPostRouter);

module.exports = route;
