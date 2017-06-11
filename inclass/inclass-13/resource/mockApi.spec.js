describe('Shared Resource Controller Tests', function() {
	var helper = jasmine.helper
	var ctrl;
	var promises = []

	beforeEach(module('tabApp'))	

	beforeEach(module(function($provide) {
		$provide.value('api', helper.mockApiService)
		$provide.value('LocationService', helper.mockLocationService)
	}))

	beforeEach(inject(function($controller, $rootScope, $q, api, LocationService) {		
		helper.init($q)
		console.log('here', api)
 		ctrl = $controller('ResourceCtrl', {
			'api': api,
			'LocationService': LocationService
		})
		ctrl._resolveTestPromises = function() {
			helper.resolveTestPromises($rootScope)
		}
		ctrl._resolveTestPromises()
	}))

	it('should have a location', function() {
		expect(ctrl.loc).toEqual(jasmine.any(Object))
	})

	it('should have a status', function() {
		expect(ctrl.userStatus).not.toBeNull()
		expect(ctrl.userStatus.length).not.toBe(0)
		expect(ctrl.userStatus).toEqual("Test Status")
	})

	it('should call the post api and get 1 Test post', function() {
		ctrl.loadPosts()
		ctrl._resolveTestPromises()
		expect(ctrl.posts.length).toBe(1)
		expect(ctrl.posts[0].author).toEqual('Test')
	})

	it('should remove a post', function() {
		ctrl.posts.push({ 'id': 1 })
		expect(ctrl.posts.length).toBe(1)
		ctrl.removePost(1)
		expect(ctrl.posts.length).toBe(0)
	})

	// ****************** //
	// XXX start here XXX //

	it('should login, register the username, and logout', inject(function(UserService) {
		// log in
		// you need to set some models in the controller first
		// ...
		var user = "sz32"
		ctrl.username = user
		// ctrl.password = "morning-prevent-slow" //Since we are using mockApi here. Only the user name is needed.
		ctrl.login()
		ctrl._resolveTestPromises()
		console.log("contrl.username:",ctrl.username,"contrl.status:",ctrl.userStatus)

		// verify UserService has username
		expect(UserService.username).toBe(user);

		// logout
		ctrl.logout()
		ctrl._resolveTestPromises()

		// verify UserService has no username
		expect(UserService.username).toBe(null);
		// expect(0).toBe(0) // remove this statement
	}))

	it('should share the username between controllers', inject(function($controller, UserService) {
		var testCtrl = $controller('TestCtrl', { UserService })
		console.log('testCtrl\'s user name', ctrl.getUsername())
		expect(ctrl.getUsername()).toBe(testCtrl.getUsername()) // uncomment this statement
		// expect(0).toBe(0) // remove this statement
	}))

})