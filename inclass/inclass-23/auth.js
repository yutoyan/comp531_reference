// It contain stubs for authorization functionality.
exports.setup = function (app) {
    app.post('/login', login);
    app.put('/logout', logout);
    app.post('/register', register);
    app.put('/password', setPassword);
    app.get('/authFacebook', passport.authenticate('facebook', {scope: 'email'}));
    app.get('/callback', passport.authenticate('facebook', {successRedirect: '/profile', failureRedirect: '/fail'}));
    app.get('/profile', isLoggedIn, profile);
    app.get('/fail', fail)
};

var User = require('../model.js').User;
var crypto = require('crypto');
var md5 = require('md5');
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var cookieKey = 'sid';
var sessionUser = {};
var currentSid = 0;
var port = "3000";


var users = {};
var config = {
    clientID: '636790953145162',
    clientSecret: '6ea79c5a2d31f6ddc66451c7b40ef163',
    callbackURL: 'http://localhost:' + port + '/callback'
};

passport.serializeUser(function (user, done) {
    users[user.id] = user;
    done(null, user.id)
});

passport.deserializeUser(function (id, done) {
    var user = users[id];
    done(null, user)
});
passport.use(new FacebookStrategy(config,
    function (token, refreshToken, profile, done) {
        process.nextTick(function () {
            return done(null, profile)
        })
    }));


function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        next()
    } else {
        res.redirect('/login')
    }
}
function profile(req, res) {
    res.send('ok now what?', req.user)
}


function logout(req, res) {
    //req.logout();
    res.redirect('/')
}

function setPassword(req, res) {
    var username = req.user ? req.user : "defaultTestUser";
    res.send({
        "username": username,
        "status": "will not change"
    })
}
function fail(req, res) {
    res.send("Failed!")
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
        sessionUser[currentSid] = username;

        // Set cookie
        res.cookie(cookieKey, currentSid, {maxAge: 3600 * 1000, httpOnly: true});
        currentSid += 1;

        res.send({
            "username": username,
            "result": "success"
        })
    });
}
