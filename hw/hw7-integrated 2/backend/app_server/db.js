var mongoose = require('mongoose');
var url = 'mongodb://heroku_rdfvcllv:5evd29304oojssq8vm9e1ucn5a@ds041032.mlab.com:41032/heroku_rdfvcllv';

if (process.env.MONGOLAB_URI) {
    url = process.env.MONGOLAB_URI;
}

mongoose.connect(url);

// Functions for mongoose connection.
mongoose.connection.on('connected', function () {
    console.log('Mongoose connected to ' + url)
});
mongoose.connection.on('error', function (err) {
    console.error('Mongoose connection error: ' + err)
});
mongoose.connection.on('disconnected', function () {
    console.log('Mongoose disconnected')
});

process.once('SIGUSR2', function () {
    shutdown('nodemon restart', function () {
        process.kill(process.pid, 'SIGUSR2')
    })
});
process.on('SIGINT', function () {
    shutdown('app termination', function () {
        process.exit(0)
    })
});
process.on('SIGTERM', function () {
    shutdown('Heroku app shutdown', function () {
        process.exit(0)
    })
});
function shutdown(msg, callback) {
    mongoose.connection.close(function () {
        console.log('Mongoose disconnected through ' + msg);
        callback()
    })
}

