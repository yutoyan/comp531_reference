// It contains just stubs for following functionality.
exports.setup = function (app) {
    app.get('/following/:user*?', getFollowings);
    app.put('/following/:user', addFollowing);
    app.delete('/following/:user', removeFollowing);
};

var _followings = {};

function getFollowings(req, res) {
    var username = req.params.user ? req.params.user.split(',')[0] : (req.user ? req.user : "defaultTestUser");
    if (!_followings[username]) {
        _followings[username] = ["following_1", "following_2", "following_3"]
    }
    res.send({"username": username, "followings": _followings[username]})
}

function addFollowing(req, res) {
    var loggedInUser = req.user ? req.user : "defaultTestUser";
    var toBeAddFollowing = req.params.user ? req.params.user.split(',')[0] : "newlyAddedFollowing";
    if (!_followings[loggedInUser]) {
        _followings[loggedInUser] = ["following_1", "following_2", "following_3"]
    }

    // Add new following.
    _followings[loggedInUser].push(toBeAddFollowing);
    res.send({"username": loggedInUser, "followings": _followings[loggedInUser]})
}

function removeFollowing(req, res) {
    var loggedInUser = req.user ? req.user : "defaultTestUser";
    var toBeRemovedFollowing = req.params.user ? req.params.user.split(',')[0] : "newlyRemovedFollowing";
    if (!_followings[loggedInUser]) {
        _followings[loggedInUser] = ["following_1", "following_2", "following_3"]
    }

    // Filter the following list.
    _followings[loggedInUser] = _followings[loggedInUser].filter(function (user) {
        return user != toBeRemovedFollowing;
    });
    res.send({"username": loggedInUser, "followings": _followings[loggedInUser]})
}

