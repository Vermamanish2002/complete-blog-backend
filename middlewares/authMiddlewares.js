const jwt = require("jsonwebtoken");

function isLoggedIn(req, res, next) {
  let token = req.cookies.token;
  if (!token) {
    return res.redirect("/login");
  }
  try {
    let decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "User not authenticated" });
  }
}

module.exports = isLoggedIn;
