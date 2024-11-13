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
  console.log(user);
  if (!user)
    return resp.render("login", {
      error: "Invalid email or password",
    });

  const token = setUser(user);
  resp.cookie("token", token);
  // return resp.redirect("/");
  // return resp.json({ token });
  return resp.redirect("/");
}

module.exports = {
  handleUserSignup,
  handleUserLogin,
};
