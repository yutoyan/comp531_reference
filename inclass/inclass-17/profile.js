// this is profile.js which contains all user profile 
// information except passwords which is in auth.js
exports.setup = function(app) {
    app.get('/statues/:users*?', getStatues);
    app.get('/status', getStatus);
    app.put('/status', setStatus);
    app.get('/email/:user', getEmail);
    app.put('/email', setEmail);
    app.get('/zipcode/:user', getZipcode);
    app.put('/zipcode', setZipcode);
    app.get('/pictures/:user', getPictures);
    app.put('/picture', setPicture);
};


function getStatues(req, res) {

    // Send the statuses for multiple users
    res.send({'statuses': [ 
        {'username': req.params.users? req.params.users.split(',')[0]: "defaultTestUser", 'status': 'the status of the user' },
        {'username': 'Scott', 'status': 'Happy'},
        {'username': 'Terry', 'status':'Happy too'}
    ] });


}

function getStatus(req, res){
    
    // Get the status for the loggedInUser
    res.send({ 'statuses': 
    	[{ 'username': req.params.users? req.params.users.split(',')[0]: "defaultTestUser", 'status': 'the status of the user'}
    ] });
}

function setStatus(req, res){
	
	// Update the status for the loggedInUser
    res.send({ 'statuses': 
    	[{ 'username': req.params.users? req.params.users.split(',')[0]: "defaultTestUser", 'status': req.body.status? req.body.status: 'the status is setted'}
    ] });
}

function getEmail(req, res){
    res.send({ 'username': req.params.users? req.params.users.split(',')[0]: "defaultTestUser", 'email': 'emailAddress'});
}

function setEmail(req, res){
	
    res.send({ 'username': req.params.users? req.params.users.split(',')[0]: "defaultTestUser", 'email': req.body.email? req.body.email: 'newEmailAddress'});
}


function getZipcode(req, res){
    res.send({ 'username': req.params.users? req.params.users.split(',')[0]: "defaultTestUser", 'zipcode': '000000'});
}


function setZipcode(req, res){
	
    res.send({ 'username': req.params.users? req.params.users.split(',')[0]: "defaultTestUser", 'zipcode': req.body.zipcode? req.body.zipcode: 'newZipcode'});
}


function getPictures(req, res){
    res.send({pictures: [
    	{'username': req.params.users? req.params.users.split(',')[0]: "defaultTestUser", 'picture': 'pictureURL1'},
    	{'username': "Scott", 'picture': "pictureURL2"},
    	{'username': "Terry", 'picture': "pictureURL3"},
    	]});
}

function setPicture(req, res){
	
    res.send({'username': req.params.users? req.params.users.split(',')[0]: "defaultTestUser", 'picture': req.body.img? req.body.img: 'pictureURL'});
}

