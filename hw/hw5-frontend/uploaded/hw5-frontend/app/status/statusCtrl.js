;(function () {

    angular.module('riceBookApp')
        .controller('StatusCtrl', StatusCtrl);

    StatusCtrl.$inject = ['$http', 'api', 'UserService'];
    function StatusCtrl($http, api, UserService) {

        var vm = this;
        vm.getUsername = getUsername;
        vm.setStatus = setStatus;
        vm.username = getUsername();
        vm.status = getStatus();
        vm.avatar = getAvatar();
        vm.getStatus = getStatus;

        // Functions.

        function getUsername() {
            //return the username from the UserService
            return UserService.username;
        }

        function getAvatar() {
            //return the avatar from the UserService
            return UserService.avatar;
        }

        function getStatus() {
            api.getStatus().$promise.then(function (result) {
                vm.status = result.statuses[0].status;
                vm.newStatus = vm.status;
            }, function (error) {
                window.alert('Not Logged In');
                $location.path('/');
            });
        }

        function setStatus() {
            api.setStatus({status: vm.newStatus}).$promise.then(function (result) {
                vm.status = result.status;
                vm.newStatus = vm.status;
            }, function (error) {
                window.alert('Not Logged In');
                $location.path('/');
            });
        }
    }
})();