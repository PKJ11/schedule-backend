const express = require('express');
const postsController = require('../controllers/posts.controller');
const commentsController = require('../controllers/comments.controller');
const authController = require('../controllers/auth.controller');
const multer = require('multer');

const router = express.Router();


// Public routes
router.get('/', postsController.getAllPosts);
router.get('/:id', postsController.getPost);

// Protected routes
router.use(authController.protect);

// Post routes
router.post(
  '/',
  authController.restrictTo('uploader'),
  postsController.createPost
);
router.patch(
  '/:id',
  authController.restrictTo('uploader'),
  postsController.updatePost
);
router.delete(
  '/:id',
  authController.restrictTo('uploader'),
  postsController.deletePost
);

// Comment routes
router.get('/:postId/comments', postsController.getPostComments);
router.post('/:postId/comments', commentsController.createComment);
router.delete('/comments/:id', commentsController.deleteComment);

// Annotation routes
router.get('/:postId/annotations', postsController.getPostAnnotations);
router.post('/:postId/annotations', commentsController.createAnnotation);
router.delete('/annotations/:id', commentsController.deleteAnnotation);

module.exports = router;