const User = require("../models/user");
const { v4: uuidv4 } = require("uuid");
const { setUser } = require("../service/auth");
async function handleUserSignup(req, resp) {
  const { name, email, password } = req.body;
  await User.create({
    name,
    email,
    password,
  });
  return resp.redirect("/login");
}

async function handleUserLogin(req, resp) {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });
  if (!user)
    return resp.render("login", {
      error: "Invalid email or password",
    });
  const sessionId = uuidv4();
  setUser(sessionId, user);
  resp.cookie("uid", sessionId);
  return resp.redirect("/");
}

module.exports = {
  handleUserSignup,
  handleUserLogin,
};
