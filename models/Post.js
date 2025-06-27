const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "A post must have a title"],
    trim: true,
  },
  content: {
    type: String,
    required: [true, "A post must have content"],
  },
  date: {
    type: Date,
    required: [true, "A post must have a scheduled date"],
  },
  image: String,
  video: {
    type: String,
  },
  author: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "A post must belong to a user"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

postSchema.index({ date: 1 });

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
