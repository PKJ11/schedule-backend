const Post = require("../models/Post");
const Comment = require("../models/Comment");
const Annotation = require("../models/Annotation");
const AppError = require("../utils/appError");

exports.getAllPosts = async (req, res, next) => {
  try {
    const { startDate, endDate } = req.query;

    let query = {};
    if (startDate && endDate) {
      query.date = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    }

    const posts = await Post.find(query)
      .populate("author", "name")
      .sort({ date: 1 });

    res.status(200).json({
      status: "success",
      results: posts.length,
      data: {
        posts,
      },
    });
  } catch (err) {
    next(err);
  }
};

exports.getPost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id).populate("author", "name");

    if (!post) {
      return next(new AppError("No post found with that ID", 404));
    }

    res.status(200).json({
      status: "success",
      data: {
        post,
      },
    });
  } catch (err) {
    next(err);
  }
};

exports.createPost = async (req, res, next) => {
  try {
    const { title, content, date, image, video} = req.body; // Now getting image as URL string
    console.log("req",req.body)
    const newPost = await Post.create({
      title,
      content,
      date,
      image: image || undefined, 
      video: video || undefined, 
      author: req.user.id,
    });

    res.status(201).json({
      status: "success",
      data: {
        post: newPost,
      },
    });
  } catch (err) {
    next(err);
  }
};

exports.updatePost = async (req, res, next) => {
  try {
    const { title, content, date, image, video} = req.body;

    const post = await Post.findByIdAndUpdate(
      req.params.id,
      {
        title,
        content,
        date,
        image: image || undefined,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!post) {
      return next(new AppError("No post found with that ID", 404));
    }

    res.status(200).json({
      status: "success",
      data: {
        post,
      },
    });
  } catch (err) {
    next(err);
  }
};

exports.deletePost = async (req, res, next) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);

    if (!post) {
      return next(new AppError("No post found with that ID", 404));
    }

    // Delete associated comments and annotations
    await Comment.deleteMany({ post: req.params.id });
    await Annotation.deleteMany({ post: req.params.id });

    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    next(err);
  }
};

exports.getPostComments = async (req, res, next) => {
  try {
    const comments = await Comment.find({ post: req.params.id })
      .populate("author", "name")
      .sort({ createdAt: -1 });

    res.status(200).json({
      status: "success",
      results: comments.length,
      data: {
        comments,
      },
    });
  } catch (err) {
    next(err);
  }
};

exports.getPostAnnotations = async (req, res, next) => {
  try {
    console.log(req.params);
    const annotations = await Annotation.find({ post: req.params.postId })
      .populate("author", "name")
      .sort({ createdAt: -1 });

    console.log(annotations);
    res.status(200).json({
      status: "success",
      results: annotations.length,
      data: {
        annotations,
      },
    });
  } catch (err) {
    next(err);
  }
};
