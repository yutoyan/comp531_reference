// It contain stubs for authorization functionality.
exports.setup = function (app) {
    app.post('/login', login);
    app.put('/logout', logout);
    app.post('/register', register);
    app.put('/password', setPassword);
};

function login(req, res) {
    var username = req.body.username ? req.body.username : "defaultTestUser";
    res.send({
        "username": username,
        "result": "success"
    })
}

function logout(req, res) {
    res.send("OK")
}

function register(req, res) {
    var username = req.body.username ? req.body.username : "newUser";
    res.send({
        "result": "success",
        "username": username
    })

}

function setPassword(req, res) {
    var username = req.user ? req.user : "defaultTestUser";
    res.send({
        "username": username,
        "status": "will not change"
    })
}