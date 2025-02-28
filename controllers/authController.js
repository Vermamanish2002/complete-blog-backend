const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.registerUser = async (req, res) => {
  let { username, name, age, email, password } = req.body;
  let user = await User.findOne({ email });
  if (user) {
    return res.status(400).json({ message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 12);
  user = new User({ username, name, age, email, password: hashedPassword });

  let token = jwt.sign({ email: email, userid: user._id }, process.env.JWT_SECRET);
  res.cookie("token", token);
  await user.save();
  res.status(201).json({ user, message: "User registered successfully" });
};

exports.loginUser = async (req, res) => {
  let { email, password } = req.body;
  let user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.redirect("/login");
  }

  let token = jwt.sign({ email: email, userid: user._id }, process.env.JWT_SECRET);
  res.cookie("token", token);
  res.redirect("/profile");
};

exports.logoutUser = (req, res) => {
  res.clearCookie("token", "");
  res.redirect("/login");
};
