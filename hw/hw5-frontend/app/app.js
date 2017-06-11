;(function() {
// 'use strict'

angular.module('riceBookApp', ['ngRoute', 'ngResource'])
    .config(config)
    .controller('MainCtrl', MainCtrl)
    .provider('myProvider', MyProvider) 
    ;

// Angular calls new MyProvider to get the singleton
// Providers can be configured in app.config()
function MyProvider() {
    this.thingFromConfig = '?';
    this.value = 'the provider';

    this.$get = function() {
        var that = this;
        return {
            thing: that.thingFromConfig,
            value: that.value
        };
    };
}
   
function MainCtrl(){
    var main = this;
    main.tab = {};
}   

function config($routeProvider, myProviderProvider) {
    $routeProvider
    .when('/logIn', {
        templateUrl: 'logIn.html',
        // controller: 'FirstCtrl',
        // controllerAs: 'vm'
    })

    .when('/main', {
        templateUrl: 'main.html',
        controller: 'MainPageCtrl',
        controllerAs: 'vm'
    })

    .when('/profile', {
        templateUrl: 'profile.html'
    })

    .otherwise({
        redirectTo: '/logIn'
    });

    myProviderProvider.thingFromConfig = 
        'Only providers can appear in config';
}   

})();