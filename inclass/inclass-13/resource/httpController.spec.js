describe('Http Controller Tests', function() {
	var ctrl;

	beforeEach(module('tabApp'))

	// register Mock providers
	beforeEach(module(function($provide) {
		$provide.factory('postFactory', function() {
			return { 
				getPosts: function(posts) {
					posts.push({
						'author':'Test',
						'title':'A Test Post',
						'date':'Today',
						'body':'... test post ...'
					})
				}
			}
		})
	}))

	beforeEach(inject(function($controller) {
		ctrl = $controller('HttpCtrl', { 
			$scope: { $on: function() {} } 
		})
	}))

	it('should load with no posts', function() {
		expect(ctrl.posts.length).toBe(0)
	})

	it('should call the post factory and get 1 Test post', function() {
		ctrl.loadPosts()
		expect(ctrl.posts.length).toBe(1)
		expect(ctrl.posts[0].author).toEqual('Test')
	})

	it('should remove a post', function() {
		ctrl.posts.push({ 'id': 1 })
		expect(ctrl.posts.length).toBe(1)
		ctrl.removePosts(1)
		expect(ctrl.posts.length).toBe(0)
	})

})