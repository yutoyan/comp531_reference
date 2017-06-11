;(function() {

angular.module('tabApp')
	.factory('postFactory', postFactory)
	.constant('hipsterURL', 'http://hipsterjesus.com/api/')
	.controller('HttpCtrl', HttpCtrl)
	;

function postFactory($http, hipsterURL) {
	
	// this is just for convenience
	function PostModel(text) {
		var body = text.replace('</p>', '')
		var s = text.split(' ')
		var title = [s[0], s[1], s[2], '...'].join(' ')
		
		this.author = "Hipster"
		this.title = title
		this.body = body
		this.date = new Date(1430012345678 + Math.random()*130e8)
	}

	function getPosts(posts) {
		$http.defaults.useXDomain = true
		$http.get(hipsterURL).then(function(response) {
			response.data.text.split('<p>')
				.filter(function(t) { return t.length > 0 })
				.forEach(function(text) {
					posts.push(new PostModel(text))
				})
		})	
	}

	return {
		getPosts: getPosts
	}
}

HttpCtrl.$inject = ['$http', '$interval', 'postFactory', '$scope']
function HttpCtrl($http, $interval, postFactory, $scope) {

	var vm = this
	vm.posts = []
	vm.loadPosts = loadPosts
	vm.removePost = removePost
	vm.toggleLoading = toggleLoading
	vm.stop = null

	// need $scope just for this...
	$scope.$on('$destroy', function(event) {
		console.log('Stop the interval when the controller dies')
		if (vm.stop) {
			$interval.cancel(vm.stop)
		}
	})

	//*********** functions ******************//

	function loadPosts() {
		vm.posts.length = 0
		postFactory.getPosts(vm.posts)
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
} ////////////////// end HttpCtrl ///////////////

})()
