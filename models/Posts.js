var mongoose = require('mongoose');

var PostSchema = new mongoose.Schema({
	title: String,
	content: String,
	author: String,
	created_at: Date,
	color: String
});

var Post = mongoose.model('Post', PostSchema);
module.exports = Post;
