(function(jasmine) { 	
	var $q
	var promises = []

	function init(_$q_) {
		$q = _$q_
	}

	function makePromise(response) {
		var p = $q.defer()
		promises.push({ promise: p, response: response })
		return { $promise: p.promise }
	}

	var mockApiService =  {
		getPosts: function() {
			return makePromise({ posts: 
				[{
					'author':'Test',
					'title':'A Test Post',
					'date':'Today',
					'body':'... test post ...'
				}]
			})
		},
		getStatus: function() {
			return makePromise(
				{ statuses: [{'status':'Test Status'}] }
			)
		},
		setStatus: function() {
			return makePromise(
				{'status':'Was set'}
			)
		},

		// XXX add the login and logout functions here
		login: function(params) {//Check params !!!
			return makePromise({
                username: params.username,
                result: "success"
            })
		},

		logout: function() {
			return makePromise({
				0: "O", 1: "K"
			})
		}

	}

	var mockLocationService = {
		get: function() { 
			return makePromise('was called')
		} 
	}

	//spyOn(mockApiService, 'getPosts').and.callThrough()
	//spyOn(mockLocationService, 'get').and.callThrough()

	var resolveTestPromises = function(rootScope) {
		promises.forEach(function(p) {
			p.promise.resolve(p.response)
		})
		promises.length = 0
		rootScope.$apply()
	}

	jasmine.helper = {
		init: init,
		mockApiService: mockApiService,
		mockLocationService: mockLocationService,
		resolveTestPromises: resolveTestPromises
	}

})(window.jasmine)