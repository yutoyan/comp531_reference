// It contain endpoints and stubs for posts functionality.
exports.setup = function (app) {
    app.get('/statuses/:users*?', getStatues);
    app.get('/status', getStatus);
    app.put('/status', setStatus);
    app.get('/email/:user*?', getEmail);
    app.put('/email', setEmail);
    app.get('/zipcode/:user*?', getZipcode);
    app.put('/zipcode', setZipcode);
    app.get('/pictures/:user*?', getPictures);
    app.put('/picture', setPicture);
};

var _statuses = {};

// Get the statuses for multiple users.
function getStatues(req, res) {
    var usernames = req.params.users ? req.params.users.split(',') : (req.user ? [req.user] : ["defaultTestUser"]);
    usernames.forEach(function (username) {
            if (!_statuses[username]) {
                _statuses[username] = "Hello World!"
            }
        }
    );

    var results = usernames.map(function (username) {
        return {"username": username, "status": _statuses[username]};
    });
    res.send({
        'statuses': results
    });
}

// Get the status for the loggedInUser.
function getStatus(req, res) {
    var username = req.user ? req.user : "defaultTestUser";
    if (!_statuses[username]) {
        _statuses[username] = "Hello World!"
    }

    res.send({
        'statuses': [{
            'username': username,
            'status': _statuses[username]
        }]
    });
}

// Update the status for the loggedInUser.
function setStatus(req, res) {
    var username = req.user ? req.user : "defaultTestUser";
    _statuses[username] = req.body.status;
    res.send({
        'statuses': [{
            'username': username,
            'status': _statuses[username]
        }]
    });
}


// Stubs.

function getEmail(req, res) {
    var username = req.params.user ? req.params.user.split(',')[0] : (req.user ? req.user : "defaultTestUser");
    res.send({
        'username': username,
        'email': 'testEmail@test.com'
    });
}

function setEmail(req, res) {
    var username = req.user ? req.user : "defaultTestUser";
    res.send({
        'username': username,
        'email': req.body.email ? req.body.email : 'newTestEmail@test.com'
    });
}

function getZipcode(req, res) {
    var username = req.params.user ? req.params.user.split(',')[0] : (req.user ? req.user : "defaultTestUser");
    res.send({
        'username': username,
        'zipcode': '00000'
    });
}


function setZipcode(req, res) {
    var username = req.user ? req.user : "defaultTestUser";
    res.send({
        'username': username,
        'zipcode': req.body.zipcode ? req.body.zipcode : '11111'
    });
}

var _pictures = {};

function getPictures(req, res) {
    var usernames = req.params.user ? req.params.user.split(',') : (req.user ? [req.user] : ["defaultTestUser"]);
    usernames.forEach(function (username) {
            if (!_pictures[username]) {
                _pictures[username] = "http://lasalletech.com/image/product-icons/technician-cts-icon.png"
            }
        }
    );

    var results = usernames.map(function (username) {
        return {"username": username, "picture": _pictures[username]};
    });
    res.send({
        'pictures': results
    });
}

function setPicture(req, res) {
    var username = req.user ? req.user : "defaultTestUser";
    res.send({
        'username': username,
        'picture': "http://lasalletech.com/image/product-icons/technician-cts-icon.png"
    });
}

