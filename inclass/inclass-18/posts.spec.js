/*
 * Test suite for posts.js
 */
var request = require('request');

function url(path) {
    return "http://localhost:3000" + path
}

describe('Validate Post Functionality', function () {

    it('should give me three or more posts', function (done) {
        // fill it in
        request(url("/posts"), function (err, res, body) {
            var body = JSON.parse(body);
            expect(res.statusCode).toBe(200);
            expect(body.posts.length).toBeGreaterThan(2);
            done();
        });
    }, 200);

    it('should add two posts with successive post ids, and return the post each time', function (done) {

        // add a new post
        // verify you get the post back with an id
        // verify the content of the post
        var newPost1 = {"body": "Newly added post 1"};
        var newPost2 = {"body": "Newly added post 2"};
        var post1Id, post2Id;

        request({
                url: url("/post"),
                method: 'POST',
                json: newPost1
            },
            function (err, res, body) {
                //body = JSON.parse(body);
                //console.log("Add a new post: ", body);
                expect(res.statusCode).toBe(200);
                post1Id = body.posts[0].id;
                expect(post1Id).toBeDefined();
                expect(body.posts[0].body).toEqual(newPost1.body);

                // add a second post
                // verify the post id increases by one
                // verify the second post has the correct content
                request({
                        url: url("/post"),
                        method: 'POST',
                        json: newPost2
                    },
                    function (err, res, body) {
                        //body = JSON.parse(body);
                        expect(res.statusCode).toBe(200);
                        post2Id = body.posts[0].id;
                        expect(post2Id).toEqual(post1Id + 1);
                        //console.log("post1ID: ", post1Id, "post2Id: ", post2Id);
                        expect(body.posts[0].body).toEqual(newPost2.body);
                        done();
                    });
            }
        );
    }, 200);

    it('should return a post with a specified id', function (done) {
        // call GET /posts first to find an id, perhaps one at randomar
        var requestedId;
        var targetUrl;

        request(url("/posts"), function (err, res, body) {
            var body = JSON.parse(body);
            expect(res.statusCode).toBe(200);
            expect(body.posts.length).toBeGreaterThan(2);
            requestedId = body.posts[Math.floor(Math.random() * body.posts.length)].id;
            targetUrl = "/posts/".concat(requestedId.toString());
            console.log("requestedId", requestedId, "targetUrl", targetUrl);

            // then call GET /posts/id with the chosen id
            // validate that only one post is returned
            request(url(targetUrl), function (err, res, body) {
                //console.log("targetUrl", targetUrl);
                //console.log("get one post", body, typeof body);
                body = JSON.parse(body);
                expect(res.statusCode).toBe(200);
                //console.log("Get one post with id 1", body);
                //console.log(typeof body);
                expect(body.posts.length).toEqual(1);
                done();
            });
        });
    }, 200);


    it('should return nothing for an invalid id', function (done) {
        // call GET /posts/id where id is not a valid post id, perhaps 0
        // confirm that you get no results

        var requestedId;
        var targetUrl;

        request(url("/posts"), function (err, res, body) {
            //console.log("get all posts", body, typeof  body);
            var body = JSON.parse(body);
            expect(res.statusCode).toBe(200);
            expect(body.posts.length).toBeGreaterThan(2);
            requestedId = 0;
            targetUrl = "/posts/".concat(requestedId.toString());
            //console.log("requestedId", requestedId, "targetUrl", targetUrl);

            // then call GET /posts/id with the chosen id
            // confirm that you get no results
            request(url(targetUrl), function (err, res, body) {
                //console.log("targetUrl", targetUrl);
                //console.log("get zero post", body, typeof body);
                body = JSON.parse(body);
                expect(res.statusCode).toBe(200);
                //console.log("Get zero post with id 0", body.posts);
                //console.log(typeof body);
                expect(body.posts.length).toBe(0);
                done();
            });
        });
    }, 200)
});
