describe('Http Factory Tests', function() {

	var fac, httpMock

	beforeEach(module('tabApp'))

	beforeEach(inject(function(postFactory, hipsterURL, $httpBackend) {
		fac = postFactory

		httpMock = $httpBackend
		httpMock.when('GET', hipsterURL).
			respond({ text: 
				"<p>This is a test post</p>" + 
				"<p>" + // skip the empty one
				"<p>This is a second test post</p>"
			})

	}))

	it('should exist', function() {
		expect(fac).not.toBeNull()
	})

	it('should convert text to two posts not three', function() {
		var posts = [] 
		fac.getPosts(posts)
		httpMock.flush()
		expect(posts.length).toBe(2)
	})

})