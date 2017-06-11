;(function () {
    angular.module('riceBookApp')
        .controller('PostCtrl', PostCtrl);

    PostCtrl.$inject = ['$http', 'api', 'UserService', '$location'];
    function PostCtrl($http, api, UserService, $location) {
        var vm = this;

        vm.loadPosts = loadPosts;
        vm.posts = [];
        loadPosts();
        vm.username = getUsername();
        vm.newPost = "";
        vm.addPost = addPost;
        vm.clearNewPost = clearNewPost;
        vm.newComment = "";
        vm.addComment = addComment;
        vm.editComment = editComment;
        vm.editPost = editPost;
        vm.getUsername = getUsername;

        // Functions to be exposed.

        function getUsername() {
            // Return the username from the UserService.
            return UserService.username;
        }

        function loadPosts() {
            api.getPosts().$promise.then(function (result) {
                var newPosts = [];
                result.posts.forEach(function (post) {
                    post.date = post.date.substr(0, 10) + ' ' + post.date.substr(11, 8);
                    post.newBody = post.body;
                    post.comments.forEach(function (comment) {
                        comment.commentEditEnabled = false;
                        comment.date = comment.date.substr(0, 10) + ' ' + comment.date.substr(11, 8);
                    });
                    post.postEditEnabled = false;
                    newPosts.push(post);
                });
                vm.posts = newPosts;
            }, function (error) {
                window.alert('Not Logged In');
                $location.path('/');
            });
        }

        function clearNewPost() {
            vm.newPost = "";
        }

        // Change the body of the given post.
        //
        // Edition of posts of others will be rejected.
        function editPost(postAuthor, postID, postBody) {
            if (postAuthor !== vm.username) {
                window.alert("Unauthorized: You can't edit other's post");
            } else {
                api.editPost({'id': postID, 'body': postBody})
                    .$promise.then(function (result) {
                    vm.loadPosts();
                }, function (error) {
                    window.alert('Unauthorized');
                });
            }
        }

        function addPost() {
            api.addPost({'body': vm.newPost})
                .$promise.then(function (result) {
                vm.loadPosts();
                vm.newPost = "";
            }, function (error) {
                window.alert('Not Logged In');
                $location.path('/');
            });
        }

        // Push the comment to the post with the given ID.
        function addComment(postID) {
            api.addComment({'id': postID, 'body': vm.newComment, 'commentId': -1})
                .$promise.then(function (result) {
                vm.loadPosts();
                vm.newComment = "";
            }, function (error) {
                window.alert('Not Logged In');
                $location.path('/');
            });
        }

        // Edit the comment.
        //
        // The edition will be rejected for unowned comments.
        function editComment(postID, commentID, commentBody, commentAuthor) {
            if (commentAuthor !== vm.username) {
                window.alert("Unauthorized: You can't edit other's comment");
            } else {
                api.editComment({'id': postID, 'body': commentBody, 'commentId': commentID})
                    .$promise.then(function (result) {
                    vm.loadPosts();
                }, function (error) {
                    window.alert('Unauthorized');
                });
            }
        }
    }
})();
