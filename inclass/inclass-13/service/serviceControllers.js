;(function() {
'use strict'

angular.module('tabApp')
	.controller('SrvCtrl', SrvCtrl)
	.controller('Srv2Ctrl', Srv2Ctrl)
	;

SrvCtrl.$inject = ['myValue', 'myFactory', 'myService', 'myProvider']
function SrvCtrl(myValue, myFactory, myService, myProvider) {
	var vm = this
	vm.name = 'Ctrl #4'
	vm.secret = 'secret value'
	vm.value = myValue
	vm.fac = myFactory
	vm.srv = myService
	vm.pvd = myProvider
}

Srv2Ctrl.$inject = ['myValue', 'myFactory', 'myService', 'myProvider']
function Srv2Ctrl(myValue, myFactory, myService, myProvider) {
	var vm = this
	vm.name = 'Duplicated #4'
	vm.secret = "the other controller 4's value"
	vm.value = myValue
	vm.fac = myFactory
	vm.srv = myService
	vm.pvd = myProvider
}

})()