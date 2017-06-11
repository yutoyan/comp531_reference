var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json());
app.post('/post', addPost);
app.get('/post', getPost);
app.get('/', hello);

var postsArray = [{	'id': 1, 'author':'Scott', 'body':'... test post 1 ...',
}, {'id': 2, 'author':'Max', 'body': '... test post 2...'}, {'id': 3, 'author':'Leo', 'body': '... test post 3...',
}];
var id = 3;

function addPost(req, res) {
	console.log('Payload received', req.body);
	id = id + 1;
	var newPost = {'author': req.body.author, 'body': req.body.body, 'id': id};
	postsArray.push(newPost);
	res.send(newPost);
}

function getPost(req, res) {
	console.log('Payload received', req.body);
	res.send({post: postsArray});
}

function hello(req, res) {
	res.send({"hello":"world"});
}

// Get the port from the environment, i.e., Heroku sets it
var port = process.env.PORT || 3000;

//////////////////////////////////////////////////////
var server = app.listen(port, function() {
	console.log('Server listening at http://%s:%s', 
		server.address().address,
		server.address().port);
});