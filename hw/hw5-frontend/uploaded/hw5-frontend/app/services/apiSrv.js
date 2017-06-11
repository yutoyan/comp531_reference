;(function () {

    angular.module('riceBookApp')
        .factory('api', apiService)
    ;

    function apiService($http, $resource, apiURL) {
        $http.defaults.withCredentials = true;
        return $resource(apiURL + '/:endpoint/:user/:id', {user: '@user', id: '@id'},
            {
                login: {method: 'POST', params: {endpoint: 'login'}},
                logout: {method: 'PUT', params: {endpoint: 'logout'}},
                getStatus: {method: 'GET', params: {endpoint: 'statuses'}},
                setStatus: {method: 'PUT', params: {endpoint: 'status'}},
                getAvatar: {method: 'GET', params: {endpoint: 'pictures'}},
                // post and comment
                getPosts: {method: 'GET', params: {endpoint: 'posts'}},
                addPost: {method: 'POST', params: {endpoint: 'post'}},
                editPost: {method: 'PUT', params: {endpoint: 'posts'}},
                addComment: {method: 'PUT', params: {endpoint: 'posts'}},
                editComment: {method: 'PUT', params: {endpoint: 'posts'}},
                // user info
                getEmail: {method: 'GET', params: {endpoint: 'email'}},
                setEmail: {method: 'PUT', params: {endpoint: 'email'}},
                getZipcode: {method: 'GET', params: {endpoint: 'zipcode'}},
                setZipcode: {method: 'PUT', params: {endpoint: 'zipcode'}},
                setPassword: {method: 'PUT', params: {endpoint: 'password'}},

            });
    }
})();
