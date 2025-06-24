const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  content: {
    type: String,
    required: [true, 'A comment must have content'],
  },
  post: {
    type: mongoose.Schema.ObjectId,
    ref: 'Post',
    required: [true, 'A comment must belong to a post'],
  },
  author: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'A comment must belong to a user'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

commentSchema.index({ post: 1 });

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;