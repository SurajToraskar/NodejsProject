const express = require("express");
const router = express.Router();
const URL = require("../models/url");
const { restrictTo } = require("../middleware/auth");

router.get("/admin/urls", restrictTo(["ADMIN"]), async (req, resp) => {
  const allUrls = await URL.find({});
  return resp.render("home", { urls: allUrls });
});

router.get("/", restrictTo(["NORMAL", "ADMIN"]), async (req, resp) => {
  const allUrls = await URL.find({ createdBy: req.user._id });
  return resp.render("home", { urls: allUrls });
});

router.get("/signup", (req, resp) => {
  return resp.render("signup");
});

router.get("/login", (req, resp) => {
  return resp.render("login");
});

module.exports = router;
