var http = require('http');

var host = '127.0.0.1';
var port = 3333;

http.createServer(preprocess).listen(port, host);
console.log('Server running at http://' + host + ':' + port);

function preprocess(req, res) {
	var body = '';
	req.on('data', function(chunk) {
		body += chunk;
	});
	req.on('end', function() {
		req.body = body;
		server(req, res);
	});
}

function server(req, res) {
	console.log('Request method        :', req.method);
	console.log('Request URL           :', req.url);
	console.log('Request content-type  :', req.headers['content-type']);
	console.log('Request payload       :', req.body);

	// var payload = { "hello": "world" };
	var payload = { "Bad": "request" };

	if (req.url === "/" && req.method === "GET"){
		payload = { "hello": "world" };
	}

	if (req.url === "/posts" && req.method === "GET") {
		var postsArray = [{"id": 1, "author": "scott", "body": "This is the first post." },{"id": 2, "author": "sw46test", "body": "This is another post."}, {"id": 3, "author": "scott", "body": "The doctor believed that no-one was ever ill but that many were workshy. And what's more, would he have been entirely."}];
		payload = { "posts": postsArray };
	}

	if (req.url === "/login" && req.method === "POST"){
		var username = JSON.parse(req.body).username;
		payload = {"username": username, "result": "success"};
	}
	if (req.url === "/logout" && req.method === "PUT"){
		payload = "OK";
	}

	res.setHeader('Content-Type', 'application/json');
	res.statusCode = 200;
	res.end(JSON.stringify(payload));
}
