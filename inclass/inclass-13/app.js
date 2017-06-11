;(function() {
'use strict'

angular.module('tabApp', ['ngRoute', 'ngResource'])
	.config(config)
	;

function config($routeProvider, myProviderProvider) {
	$routeProvider
	.when('/firstTab', {
		templateUrl: 'simple/tabOne.html',
		controller: 'FirstCtrl',
		controllerAs: 'vm'
	})

	.when('/secondTab', {
		templateUrl: 'simple/tabTwo.html',
		controller: 'SecondCtrl',
		controllerAs: 'vm'
	})

	.when('/service', {
		templateUrl: 'service/service.html'
	})

	.when('/http', {
		templateUrl: 'resource/http.html',
		controller: 'HttpCtrl',
		controllerAs: 'vm'
	})

	.when('/resource', {
		templateUrl: 'resource/resource.html',
		controller: 'ResourceCtrl',
		controllerAs: 'vm'
	})

	.when('/directive', {
		templateUrl: 'directive/page.html',
		controller: 'PageCtrl',
		controllerAs: 'vm'
	})

	.otherwise({
		redirectTo: '/firstTab'
	})

	myProviderProvider.thingFromConfig = 
		'Only providers can appear in config'
}	

})()
