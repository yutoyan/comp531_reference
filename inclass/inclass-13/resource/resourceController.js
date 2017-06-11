;(function() {

// Look for lines with XXX and fill in the missing implementation

angular.module('tabApp')
	.constant('apiURL', 'https://webdev-dummy.herokuapp.com')
	.factory('api', apiService)
	.factory('LocationService', LocationService)
	.factory('UserService', userService)
	.controller('ResourceCtrl', ResourceCtrl)
	.controller('TestCtrl', TestCtrl)
	;

function apiService($http, $resource, apiURL) {
    $http.defaults.withCredentials = true
	return $resource(apiURL + '/:endpoint/:user', {  }, 
		{
            login    : { method:'POST', params: {endpoint: 'login'  } },
            logout   : { method: 'PUT' , params: {endpoint: 'logout'  } },
			getStatus: { method:'GET', params: {endpoint: 'statuses'} },
			setStatus: { method:'PUT', params: {endpoint: 'status'} },
			getPosts : { method:'GET', params: {endpoint: 'posts' } },
			addPost  : { method:'POST', params: {endpoint: 'post' } }
		})
}

function LocationService($resource, apiURL) {
	return $resource(apiURL + '/locations/:user', { user: '@user' }, {
         update: { url: apiURL + '/location',  method: 'PUT'}
	})
}

function userService() {
	// XXX Use the UserService to share the username of the 
	// logged in user between controller instances
	return {username: null}
}

ResourceCtrl.$inject = ['$http', '$interval', 'api', 'LocationService', 'UserService']
function ResourceCtrl($http, $interval, api, LocationService, UserService) {

	var vm = this
	vm.posts = []
	vm.loadPosts = loadPosts
	vm.removePost = removePost
	vm.toggleLoading = toggleLoading
	vm.stop = null
    vm.loggedIn = false

	vm.userStatus = ''
	vm.getUsername = getUsername
	vm.updateStatus = updateStatus
	vm.updateLocation = updateLocation
    vm.login = login
    vm.logout = logout

	// treat LocationService as classic REST API
	vm.loc = LocationService.get()

	getStatus()

	// sz
	vm.newPost = "";
	vm.addPost = addPost;

	//*********** functions ******************//

	function getUsername() {
		// XXX return the username from the UserService
		return UserService.username;
	}

    function login() {
         console.log('logging in', vm.username)
         
        api.login({'username':vm.username, 'password':vm.password})
             .$promise.then(function(result) {
                   console.log('Payload from server:', result)
                   getStatus()
                   vm.loggedIn = true
                   vm.password = ''
                   vm.loc = LocationService.get()
                   // XXX grab the username from the server
                   // put it into the UserService singleton
			       UserService.username = result.username;  // Use the login name from the server.
             })
    }

    function logout() {
         api.logout()
         vm.username = ''
         vm.userStatus =''
         vm.newUserStatus =''
         vm.loggedIn = false
         vm.loc = { }
         // XXX clear the UserService singleton's username value
		 UserService.username = null;
    }


	function loadPosts() {
		vm.posts.length = 0
		api.getPosts().$promise.then(function(result) {
			result.posts.forEach(function(post) {
				vm.posts.push(post)
			})
		})
	}

	function removePost(postId) {
        var index = vm.posts.findIndex(function(post) { 
             return post.id === postId 
        }) 
        if (index >= 0) { 
             vm.posts.splice(index, 1)  
        } 
	}

	function toggleLoading() {
		if (vm.stop) {
			console.log('stopping interval')
			$interval.cancel(vm.stop)
			vm.stop = null
		} else {
			console.log('starting interval')
			vm.loadPosts()
			vm.stop = $interval(vm.loadPosts, 5000)
		}
	}

	function getStatus() {
		api.getStatus().$promise.then(function(result) {
			vm.userStatus = result.statuses[0].status
			vm.newUserStatus = vm.userStatus
            vm.loggedIn = true
		})
	}

	function updateStatus() {
		api.setStatus({ status: vm.newUserStatus}).$promise.
		then(function(result) {
            console.log(result)
			vm.userStatus = result.status
			vm.newUserStatus = vm.userStatus
		})
	}

	function updateLocation(which) {
        console.log('updateLocation', which)
		switch(which) {
			case 'lat':
				vm.loc.location.lat = vm.loc.location.lat + (Math.random() - 0.5)*5
				break;
			case 'lng':
				vm.loc.location.lng = vm.loc.location.lng + (Math.random() - 0.5)*5
		}
		vm.loc.$update({user:vm.user})
	}


	function addPost(){
		console.log("new post will be added: ", vm.newPost)
		api.addPost({'body':vm.newPost})
             .$promise.then(function(result) {
                   console.log('Payload from server:', result)
                   vm.loadPosts()
                   vm.newPost = ""
             })
	}

} ////////////////// end FifthCtrl ///////////////

TestCtrl.$inject = ['UserService']
function TestCtrl(UserService) {
	this.getUsername = function() {
		// XXX return the username from the UserService
		return UserService.username;
	}
}

})()
