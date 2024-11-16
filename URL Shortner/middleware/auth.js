const { getUser } = require("../service/auth");

function checkForAuthentication(req, resp, next) {
  // const authorizationHeaderValue = req.headers["authorization"];
  // req.user = null;
  // if (
  //   !authorizationHeaderValue ||
  //   !authorizationHeaderValue.startsWith("Bearer")
  // )
  //   return next();

  // const token = authorizationHeaderValue.split("Bearer ")[1];
  const tokenCookie = req.cookies?.token;
  // console.log(tokenCookie);
  req.user = null;
  if (!tokenCookie) return next();

  const token = tokenCookie;
  const user = getUser(token);
  req.user = user;
  return next();
}f

function restrictTo(roles = []) {
  return function (req, resp, next) {
    console.log(roles.join(","));
    // if (!req.user) return resp.redirect("/login");
    // console.log(req.user);
    if (!roles.includes(req.user.role)) return resp.end("Unauthorized");
    return next();
  };
}

module.exports = { checkForAuthentication, restrictTo };
