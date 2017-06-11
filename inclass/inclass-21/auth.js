// It contain stubs for authorization functionality.
exports.setup = function (app) {
    app.post('/login', login);
    app.put('/logout', logout);
    app.post('/register', register);
    app.put('/password', setPassword);
    app.post('/register', register);
};

var User = require('../model.js').User;
var crypto = require('crypto');
var md5 = require('md5');
var cookieKey = 'sid';
var sessionUser = {};
var currentSid = 0;

function logout(req, res) {
    res.send("OK")
}

function setPassword(req, res) {
    var username = req.user ? req.user : "defaultTestUser";
    res.send({
        "username": username,
        "status": "will not change"
    })
}

// Functions implemented for in class 20.

function register(req, res) {
    var username = req.body.username;
    var password = req.body.password;
    var salt = crypto.randomBytes(16).toString('hex');
    console.log("salt:", salt);
    var saltedHash = md5([username, password, salt].join(":"));
    new User({username: username, salt: salt, hash: saltedHash}).save(function (result) {
        console.log('done with save', username, "result: ", result)
    });
    res.send({username: username, status: "success"})

}

function login(req, res) {
    var username = req.body.username;
    var password = req.body.password;

    // Bad request
    if (!username || !password) {
        res.sendStatus(400);
        return
    }

    User.find({username: username}, function (err, userObj) {
        // Unauthorized request.
        var userObj = userObj[0];
        console.log("userObj", userObj);
        if (!userObj || md5([username, password, userObj.salt].join(":")) !== userObj.hash) {
            res.sendStatus(401);
            console.log("State: Unauthorized!");
            return
        }

        // Success login
        console.log("State: Success!");
        sessionUser[username] = currentSid;

        // Set cookie
        res.cookie(cookieKey, currentSid, {maxAge: 3600 * 1000, httpOnly: true});
        currentSid += 1;

        res.send({
            "username": username,
            "result": "success"
        })
    });
}
