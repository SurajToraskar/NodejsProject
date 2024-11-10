const express = require("express");
const router = express.Router();
const URL = require("../models/url");

router.get("/", async (req, resp) => {
  if (!req.user) return resp.redirect("/login");
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
