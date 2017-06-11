// this is model.js
var mongoose = require('mongoose');
require('./db.js');

var commentSchema = new mongoose.Schema({
    commentId: Number, author: String, date: Date, body: String
});
var postSchema = new mongoose.Schema({
    id: Number, author: String, img: String, date: Date, body: String,
    comments: [commentSchema]
});

var userSchema = new mongoose.Schema({
    username: String, salt: String, hash: String
});

exports.Post = mongoose.model('Post', postSchema);
exports.User = mongoose.model('User', userSchema);