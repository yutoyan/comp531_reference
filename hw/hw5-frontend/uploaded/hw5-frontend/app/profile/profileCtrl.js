;(function () {
    angular.module('riceBookApp')
        .controller('ProfileCtrl', ProfileCtrl);

    ProfileCtrl.$inject = ['$http', 'api', 'UserService', '$location'];
    function ProfileCtrl($http, api, UserService, $location) {
        var vm = this;
        vm.username = "";
        vm.avatar = getAvatar();
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
        vm.getUsername = getUsername;
        vm.getEmail = getEmail;
        vm.getZipcode = getZipcode;
        vm.updateProfile = updateProfile;
        vm.validateEmail = validateEmail;
        vm.validateZipcode = validateZipcode;
        vm.validatePassword = validatePassword;
        vm.getEmail();
        vm.getUsername();
        vm.getZipcode();


        // Functions.

        function getUsername() {
            // Return the username from the UserService.
            vm.username = UserService.username;
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
        }

        function updateEmail() {
            if (validateEmail()) {
                vm.emailMsg = "";
                api.setEmail({'email': vm.newEmail})
                    .$promise.then(function (result) {
                    vm.email = result.email;
                }, function (error) {
                    // error.status == 401 Unauthorized
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
                vm.zipcodeMsg = "invalid zipcode! (5 digits)";
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
            } else {
                vm.zipcodeMsg = "invalid zipcode! (5 digits)";
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
                vm.passwordMsg = "Unmatch password";
                return false;
            } else {
                vm.passwordMsg = "";
                return true;
            }
        }
    }
})();

