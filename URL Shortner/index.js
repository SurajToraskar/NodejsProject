const express = require("express");
const app = express();
const path = require("path");
const cookieParser = require("cookie-parser");
const PORT = 8001;
const urlRoute = require("./routes/url");
const { connectToMongoDB } = require("./connection");
const URL = require("./models/url");
const staticRoute = require("./routes/staticRouter");
const userRoute = require("./routes/user");
const { restrictToLoggedInUserOnly, checkAuth } = require("./middleware/auth");
connectToMongoDB("mongodb://127.0.0.1:27017/short-url")
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((error) => {
    console.log("failed to connect to db");
  });
app.set("view engine", "ejs");

app.set("views", path.resolve("./views"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/url", restrictToLoggedInUserOnly, urlRoute);
app.use("/", checkAuth, staticRoute);
app.use("/user", userRoute);

app.use("/test", (req, resp) => {
  return resp.render("home");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
