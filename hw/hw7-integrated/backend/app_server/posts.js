// Endpoints that contains all user profile information except passwords which is in auth.js
exports.setup = function (app) {
    app.get('/posts/:id*?', isLoggedIn, getPost);
    app.post('/post', isLoggedIn, addPost);
    app.put('/posts/:id', isLoggedIn, setPost);
    app.post('/image', uploadImage, putImage)
};
var isLoggedIn = require('./auth.js').isLoggedIn;
var getHash = require('./auth.js').getHash;
var Post = require('./model.js').Post;
var multer = require('multer');
var stream = require('stream');
var cloudinary = require('cloudinary');

// multer parses multipart form data.  Here we tell
// it to expect a single file upload named 'image'
var uploadImage = multer().single('image');

exports.uploadImage = uploadImage;

function addPost(req, res) {
    var username = req.user;
    new Post({
        'id': getHash(username, new Date().getTime()),
        'author': username,
        'body': req.body.body,
        'date': new Date().getTime(),
        "comments": []
    }).save(function (err, result) {
        if (err) {
            return handleError(err);
        }
        res.send({'posts': [result]});
    });
}

function getPost(req, res) {
    var requestedId = req.params.id ? req.params.id.split(',')[0] : null;
    if (requestedId === null) {
        Post.find({}).sort('-date').exec(function (err, posts) {
            if (err) throw err;
            res.send({'posts': posts});
        })
    } else {
        Post.find({id: requestedId}, function (err, posts) {
            if (err) throw err;
            res.send({"posts": posts})
        });
    }
}

function setPost(req, res) {
    var postID = req.params.id.split(',')[0];
    var commentID = req.body.commentId ? req.body.commentId : null;
    var user = req.user;
    // Update post when no commentID is supplied.
    if (commentID === null) {
        Post.findOneAndUpdate({id: postID}, {body: req.body.body}, function (err, post) {
            if (err) throw err;
            post.body = req.body.body;
            res.send({"posts": [post]})

        })

    } else if (commentID == "-1") { // Add a comment
        Post.find({id: postID}, function (err, result) {
            if (err) throw err;
            var post = result[0];
            post.comments.push({
                commentId: getHash(user, new Date().getTime()),
                author: user,
                body: req.body.body,
                date: new Date().getTime()
            });
            post.save(function (err, result) {
                if (err) throw err;
                res.send({'posts': [result]});
            })
        })
    } else { // Edit a comment
        Post.find({id: postID}, function (err, result) {
            if (err) throw err;
            var post = result[0];
            var commentIndex = post.comments.findIndex(function (comment) {
                return comment.commentId === commentID;
            });
            post.comments[commentIndex].body = req.body.body;

            post.save(function (err, result) {
                if (err) throw err;
                res.send({'posts': [result]});
            })
        })
    }}

    function putImage(req, res) {

        // body-parser provides us the textual formData
        // which is just title in this case
        var publicName = req.body.title;

        var uploadStream = cloudinary.uploader.upload_stream(function (result) {
            // create an image tag from the cloudinary upload
            var image = cloudinary.image(result.public_id, {
                format: "png", width: 100, height: 130, crop: "fill"
            });
            // create a response to the user's upload
            res.send('Done:<br/> <a href="' + result.url + '">' + image + '</a>');
        }, {public_id: publicName});

        // multer can save the file locally if we want
        // instead we do not instruct multer to save the file
        // and have the file in memory.
        // multer provides req.file and within is the byte buffer

        // we create a passthrough stream to pipe the buffer
        // to the uploadStream for cloudinary.
        var s = new stream.PassThrough();
        s.end(req.file.buffer);
        s.pipe(uploadStream);
        s.on('end', uploadStream.end);
        // and the end of the buffer we tell cloudinary to end the upload.

    }

