;(function() {
'use strict'

angular.module('tabApp')
	.controller('MainCtrl', MainCtrl)	
	.controller('FirstCtrl', FirstCtrl)
	.controller('SecondCtrl', SecondCtrl)
	;

MainCtrl.$inject = ['$scope', '$location']
function MainCtrl($scope, $location) {
	var vm = this
	vm.tab = { }
	vm.name = 'Main Page'	

	vm.getLocation = function() {
		return $location.path()
	}
}

function FirstCtrl() {
	var vm = this
	vm.name = 'First Tab'	
}

function SecondCtrl() {
	var vm = this

	vm.name = 'Second Tab'
	vm.box = { 'third' : true  }
}

})()