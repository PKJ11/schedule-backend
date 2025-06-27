const mongoose = require('mongoose');

const annotationSchema = new mongoose.Schema({
  text: {
    type: String,
    required: [true, 'An annotation must have text'],
  },
  x: {
    type: Number,
    required: function() { return this.mediaType === 'image'; },
    min: 0,
    max: 100,
  },
  y: {
    type: Number,
    required: function() { return this.mediaType === 'image'; },
    min: 0,
    max: 100,
  },
  timestamp: {
    type: Number,
    required: function() { return this.mediaType === 'video'; },
  },
  mediaType: {
    type: String,
    enum: ['image', 'video'],
    default: 'image',
  },
  post: {
    type: mongoose.Schema.ObjectId,
    ref: 'Post',
    required: [true, 'An annotation must belong to a post'],
  },
  author: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'An annotation must belong to a user'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

annotationSchema.index({ post: 1 });

const Annotation = mongoose.model('Annotation', annotationSchema);

module.exports = Annotation;