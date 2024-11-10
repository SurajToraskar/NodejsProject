const express = require("express");
const router = express.Router();
const {
  handleGenerateNewShortURL,
  handleRedirectUrl,
  handleGetAnalytics,
} = require("../controllers/url");

router.post("/", handleGenerateNewShortURL);
router.get("/:shortId", handleRedirectUrl);
router.get("/analytics/:shortId", handleGetAnalytics);

module.exports = router;
