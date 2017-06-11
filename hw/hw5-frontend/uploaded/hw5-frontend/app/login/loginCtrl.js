;(function () {

    angular.module('riceBookApp')
        .controller('LoginCtrl', LoginCtrl);

    LoginCtrl.$inject = ['api', 'UserService', '$location'];
    function LoginCtrl(api, UserService, $location) {

        var vm = this;

        // Model variables.
        vm.loggedIn = false;
        vm.login = login;
        vm.logout = logout;
        vm.msg = "";
        vm.username = null;

        // Functions.
        function login() {
            if (checkLogin()) {
                vm.msg = "";

                api.login({'username': vm.username, 'password': vm.password})
                    .$promise.then(function (result) {
                    // Grab the username from the server put it into the UserService singleton.
                    UserService.username = result.username;  // Use the login name from the server.
                    getAvatar();  // Change path in getAvatar().
                }, function () {
                    vm.msg = "Invalid combination of username and password";
                });
            } else {
                vm.msg = "Please enter your name and password.";
            }
        }

        function logout() {
            api.logout();
            vm.username = '';
            // Clear the UserService singleton's username value.
            UserService.username = null;
            UserService.avatar = null;
        }

        // Get the avatar of the current user from the server.
        //
        // The result is saved into the UserService.
        function getAvatar() {
            api.getAvatar().$promise.then(function (result) {
                UserService.avatar = result.pictures[0].picture;
                $location.path('/main');
            }, function () {
                window.alert('Not Logged In');
                $location.path('/');
            });
        }

        // Check if user has entered something for both the username and password.
        //
        // No serious validation is performed.
        function checkLogin() {
            return !(vm.username === null || vm.username === "" || vm.password === null || vm.password === "");
        }
    }
})();
