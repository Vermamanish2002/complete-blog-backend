const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const { createPost, likePost } = require("../controllers/postController");
const isLoggedIn = require("../middlewares/authMiddlewares")

router.get("/profile", isLoggedIn, async (req, res) => {
  let user = await User.findOne({ email: req.user.email }).populate("posts");
  res.render("profile", { user });
});

router.post("/post", isLoggedIn, createPost);
router.get("/like/:id", isLoggedIn, likePost);

module.exports = router;
