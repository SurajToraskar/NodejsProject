const URL = require("../models/url");
const ShortUniqueId = require("short-unique-id");

async function handleGenerateNewShortURL(req, resp) {
  const body = req.body;
  const shortID = new ShortUniqueId({ length: 7 }).rnd();

  if (!body.url) return resp.status(400).json({ error: "url is required" });
  await URL.create({
    shortId: shortID,
    redirectURL: body.url,
    visitHistory: [],
    createdBy: req.user._id,
  });
  return resp.render("home", {
    id: shortID,
  });
  // return resp.status(200).json({ id: shortID });
}

async function handleRedirectUrl(req, resp) {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    {
      shortId: shortId,
    },
    {
      $push: {
        visitHistory: {
          timeStamp: Date.now(),
        },
      },
    }
  );
  resp.status(200).redirect(entry.redirectURL);
}

async function handleGetAnalytics(req, resp) {
  const shortId = req.params.shortId;
  const result = await URL.findOne({ shortId });
  return resp.status(200).json({
    totalClicks: result.visitHistory.length,
    analytics: result.visitHistory,
  });
}

module.exports = {
  handleGenerateNewShortURL,
  handleRedirectUrl,
  handleGetAnalytics,
};
