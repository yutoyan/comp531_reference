;(function() {
'use strict'

angular.module('tabApp')
	.constant('myValue', { a: 1, b: 2 } )
	.factory('myFactory', myFactory)
	.service('myService', MyService)
	.provider('myProvider', MyProvider)	
	;

// Angular calls myFactory() to get the singleton
function myFactory() {
	return { value: 'the factory' }
}

// Angular calls new MyService to get the singleton
function MyService() {
	this.value = 'The service'
}

// Angular calls new MyProvider to get the singleton
// Providers can be configured in app.config()
function MyProvider() {
	this.thingFromConfig = '?'
	this.value = 'the provider'

	this.$get = function() {
		var that = this;
		return {
			thing: that.thingFromConfig,
			value: that.value
		}
	}
}


})()