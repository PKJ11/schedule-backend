const Comment = require('../models/Comment');
const Annotation = require('../models/Annotation');
const AppError = require('../utils/appError');

exports.createComment = async (req, res, next) => {
  try {
    const { content } = req.body;

    const newComment = await Comment.create({
      content,
      post: req.params.postId,
      author: req.user.id,
    });

    res.status(201).json({
      status: 'success',
      data: {
        comment: newComment,
      },
    });
  } catch (err) {
    next(err);
  }
};

exports.createAnnotation = async (req, res, next) => {
  try {
    const { text, x, y } = req.body;

    const newAnnotation = await Annotation.create({
      text,
      x,
      y,
      post: req.params.postId,
      author: req.user.id,
    });

    res.status(201).json({
      status: 'success',
      data: {
        annotation: newAnnotation,
      },
    });
  } catch (err) {
    next(err);
  }
};

exports.deleteComment = async (req, res, next) => {
  try {
    const comment = await Comment.findOneAndDelete({
      _id: req.params.id,
      author: req.user.id,
    });

    if (!comment) {
      return next(new AppError('No comment found with that ID', 404));
    }

    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (err) {
    next(err);
  }
};

exports.deleteAnnotation = async (req, res, next) => {
  try {
    const annotation = await Annotation.findOneAndDelete({
      _id: req.params.id,
      author: req.user.id,
    });

    if (!annotation) {
      return next(new AppError('No annotation found with that ID', 404));
    }

    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (err) {
    next(err);
  }
};