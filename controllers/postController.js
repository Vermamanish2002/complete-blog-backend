const Post = require("../models/post");
const User = require("../models/userModel");

exports.createPost = async (req, res) => {
  try {
    let user = await User.findOne({ email: req.user.email });
    let { content } = req.body;

    let postdata = await Post.create({ user: user._id, content });
    user.posts.push(postdata._id);
    await user.save();

    res.redirect("/profile");
  } catch (err) {
    console.error(err);
    res.status(500).send("An error occurred while creating the post");
  }
};

exports.likePost = async (req, res) => {
  let post = await Post.findOne({ _id: req.params.id }).populate("user");

  if (post.likes.includes(req.user.userid)) {
    post.likes = post.likes.filter(id => id.toString() !== req.user.userid);
  } else {
    post.likes.push(req.user.userid);
  }

  await post.save();
  res.redirect("/profile");
};
