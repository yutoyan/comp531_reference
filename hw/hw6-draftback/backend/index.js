var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');

var app = express();
app.use(bodyParser.json());
app.use(logger("default"));
app.get('/', sayHello);

require('./app_server/auth.js').setup(app);
require('./app_server/following.js').setup(app);
require('./app_server/posts.js').setup(app);
require('./app_server/profile.js').setup(app);

// Get the port from the environment, i.e., Heroku sets it.
var port = process.env.PORT || 3000;

function sayHello(req, res) {
    res.send({"hello": "world"})
}

// Start the server.
var server = app.listen(port, function () {
    console.log('Server listening at http://%s:%s',
        server.address().address,
        server.address().port);
});
