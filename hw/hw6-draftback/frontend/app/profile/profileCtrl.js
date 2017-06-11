;(function () {
    angular.module('riceBookApp')
        .controller('ProfileCtrl', ProfileCtrl);

    ProfileCtrl.$inject = ['$http', 'api', 'UserService', '$location', '$scope'];
    function ProfileCtrl($http, api, UserService, $location, $scope) {
        var vm = this;
        vm.username = "";
        vm.avatar = "";
        vm.email = "";
        vm.zipcode = "";
        vm.password = "";
        vm.emailMsg = "";
        vm.zipcodeMsg = "";
        vm.passwordMsg = "";
        vm.newEmail = "";
        vm.newZipcode = "";
        vm.newPassword = "";
        vm.newPasswordConfirmation = "";
        vm.logout = logout;
        vm.updateProfile = updateProfile;
        vm.validateEmail = validateEmail;
        vm.validateZipcode = validateZipcode;
        vm.validatePassword = validatePassword;
        vm.setFile = setFile;
        $scope.imageFile = null;
        vm.newAvatar = null;


        // Update the username, avatar, email, and zipcode.
        updateUserInfo();


        // Functions.

        // Get the username and avatar of the current logged-in-user from the server.
        //
        // The result is saved into the UserService.
        function updateUserInfo() {
            api.getAvatar().$promise.then(function (result) {
                UserService.avatar = result.pictures[0].picture;
                UserService.username = result.pictures[0].username;
                vm.username = getUsername();
                vm.avatar = getAvatar();
                getEmail();
                getZipcode();
            }, function () {
                window.alert('Not Logged In');
                $location.path('/');
            });
        }

        function getUsername() {
            // Return the username from the UserService.
            return UserService.username;
        }

        function getAvatar() {
            // Return the avatar from the UserService.
            return UserService.avatar;
        }

        function logout() {
            api.logout();
            vm.username = '';
            vm.loggedIn = false;
            // Clear the UserService singleton's username value.
            UserService.username = null;
            UserService.avatar = null;
            $location.path('/');
        }


        function getEmail() {
            api.getEmail()
                .$promise.then(function (result) {
                vm.email = result.email;
            }, function (error) {
                window.alert('Not Logged In');
                $location.path('/');
            });
        }

        function getZipcode() {
            api.getZipcode()
                .$promise.then(function (result) {
                vm.zipcode = result.zipcode;
            }, function (error) {
                window.alert('Not Logged In');
                $location.path('/');
            });
        }

        function updateProfile() {
            if (vm.newEmail !== "") {
                updateEmail();
            }
            if (vm.newZipcode !== "") {
                updateZipcode();
            }
            if (vm.newPassword !== "" || vm.newPasswordConfirmation !== "") {
                updatePassword();
            }
            if (vm.newAvatar) {
                updateAvatar();
            }
        }

        function setFile(element) {
            $scope.$apply(function ($scope) {
                $scope.imageFile = element.files[0];
            });
            vm.newAvatar = $scope.imageFile;
        }

        function updateAvatar() {
            api.setAvatar({'img': vm.newAvatar})
                .$promise.then(function (result) {
                vm.avatar = result.picture;
                vm.newAvatar = null;
                $scope.imageFile = null
            }, function (error) {
                window.alert('Not Logged In');
                $location.path('/');
            });
        }

        function updateEmail() {
            if (validateEmail()) {
                vm.emailMsg = "";
                api.setEmail({'email': vm.newEmail})
                    .$promise.then(function (result) {
                    vm.email = result.email;
                }, function (error) {
                    window.alert('Not Logged In');
                    $location.path('/');
                });
            } else {
                vm.emailMsg = "Invalid Email";
            }
            vm.newEmail = "";
        }

        function updateZipcode() {
            if (validateZipcode()) {
                vm.zipcodeMsg = "";
                api.setZipcode({'zipcode': vm.newZipcode})
                    .$promise.then(function (result) {
                    vm.zipcode = result.zipcode;
                }, function (error) {
                    window.alert('Not Logged In');
                });
            } else {
                vm.zipcodeMsg = "invalid zipcode (5 digits)";
            }
            vm.newZipcode = "";
        }

        function updatePassword() {
            if (validatePassword()) {
                api.setPassword({'password': vm.newPassword})
                    .$promise.then(function (result) {
                    vm.passwordMsg = result.status;
                }, function (error) {
                    window.alert('Not Logged In');
                });
            }
            vm.newPassword = "";
            vm.newPasswordConfirmation = "";
        }

        function validateEmail() {
            // A regex able to match most e-mail addresses.
            var re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
            if (!re.test(vm.newEmail)) {
                vm.emailMsg = "Invalid Email";
                return false;
            } else {
                vm.emailMsg = "";
                return true;
            }
        }

        function validateZipcode() {
            var reg = /^\d{5}$/;
            if (!reg.test(vm.newZipcode)) {
                vm.zipcodeMsg = "Invalid zipcode (5 digits)";
                return false;
            } else {
                vm.zipcodeMsg = "";
                return true;
            }
        }

        function validatePassword() {
            if (vm.newPassword !== vm.newPasswordConfirmation) {
                vm.passwordMsg = "Unmatched password";
                return false;
            } else {
                vm.passwordMsg = "";
                return true;
            }
        }
    }
})();

