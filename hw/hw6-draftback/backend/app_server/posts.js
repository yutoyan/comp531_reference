// Endpoints that contains all user profile information except passwords which is in auth.js
exports.setup = function (app) {
    app.get('/posts/:id*?', getPost);
    app.post('/post', addPost);
    app.put('/post/:id', setPost)
};

var postsArray = [
    {
        'id': 1,
        'author': 'Scott',
        'body': '...test post 1...',
        "date": new Date("May 01, 2015 5:5:00"),
        "comments": [{
            "commentId": 7830782,
            "author": "wvw1",
            "date": new Date("June 01, 2015 15:5:00"),
            "body": "as saying through shrinking from toil and pain. These cases are perfectly simple and easy"
        }]
    },
    {
        'id': 2,
        'author': 'Max',
        'body': '...test post 2...',
        "date": new Date("March 28, 2015 20:07:00"),
        "comments": [{

            "commentId": 9789192,
            "author": "Follower",
            "date": new Date("October 01, 2015 11:43:00"),
            "body": "for "
        }]
    },
    {
        'id': 3,
        'author': 'Leo',
        'body': '...test post 3...',
        "date": new Date("Jan 13, 2016 10:20:00"),
        "comments": []
    }];

function addPost(req, res) {
    var username = req.user ? req.user : "defaultTestUser";
    var newPost = {
        'id': postsArray.length + 1,
        'author': username,
        'body': req.body.body,
        'date': new Date(),
        "comments": []
    };
    postsArray.push(newPost);
    res.send({'posts': [newPost]});
}

function getPost(req, res) {
    var requestedId = req.params.id ? req.params.id.split(',')[0] : null;
    if (requestedId === null) {
        res.send({'posts': postsArray});
    } else {
        requestedId = parseInt(requestedId);
        var index = postsArray.findIndex(function (post) {
            return post.id == requestedId;
        });
        if (index == -1) {
            res.send({"posts": []})
        } else {
            res.send({"posts": [postsArray[index]]})
        }
    }
}

function setPost(req, res) {
    // Send the first post as stubbed data.
    res.send({"posts": [postsArray[0]]});
}
