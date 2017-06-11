// this is profile.js which contains all user profile 
// information except passwords which is in auth.js
exports.setup = function (app) {
    app.get('/posts/:id*?', getPost);
    app.post('/post', addPost);
};

var postsArray = [
    {'id': 1, 'author': 'Scott', 'body': '...test post 1...'},
    {'id': 2, 'author': 'Max', 'body': '...test post 2...'},
    {'id': 3, 'author': 'Leo', 'body': '...test post 3...'}];


function addPost(req, res) {
    console.log('New post received', req.body);
    var newPost = {'author': req.body.author || "defaultUser", 'body': req.body.body, 'id': postsArray.length + 1};
    postsArray.push(newPost);
    res.send({'posts': [newPost]});
}

function getPost(req, res) {
    console.log('Payload received', req.body);
    console.log('if received id: ', req.params.id, typeof req.params.id);
    var requestedId = req.params.id ? req.params.id.split(',')[0] : null;
    if (requestedId === null) {
        res.send({'posts': postsArray});
    } else {
        requestedId = parseInt(requestedId);
        var index = postsArray.findIndex(function (post) {
            return post.id == requestedId;
        });
        console.log("index founded", index, typeof index);
        if (index == -1) {
            res.send({"posts": []})
        } else {
            res.send({"posts": [postsArray[index]]})
        }

    }
}

