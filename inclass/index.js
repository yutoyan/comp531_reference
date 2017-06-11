var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var cookieParser = require('cookie-parser');

var app = express();
app.use(bodyParser.json());
app.use(logger("default"));
app.use(cookieParser());
app.use(middleware);
app.get('/', sayHello);

require('./app_server/auth.js').setup(app);
require('./app_server/following.js').setup(app);
require('./app_server/posts.js').setup(app);
require('./app_server/profile.js').setup(app);

// Get the port from the environment, i.e., Heroku sets it.
var port = process.env.PORT || 3000;

function middleware(req, res, next){
    if (req.headers.origin) {
        res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type,Authorization');
        res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        res.setHeader('Access-Control-Allow-Credentials', 'true');
        if (req.method === 'OPTIONS') return res.send(200)
    }
    next();
}

function sayHello(req, res) {
    res.send({"hello": "world"})
}

// Start the server.
var server = app.listen(port, function () {
    console.log('Server listening at http://%s:%s',
        server.address().address,
        server.address().port);
});
