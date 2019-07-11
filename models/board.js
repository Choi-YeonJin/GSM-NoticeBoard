var mongoose = require('mongoose');

var postSchema = mongoose.Schema({
  title: { type: String, required: true },
  body: { type: String, required: true },
  author: { type: String, required: true },
});

var Post = mongoose.model('post', postSchema);
module.exports = Post;