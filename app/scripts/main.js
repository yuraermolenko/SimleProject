/**
 * Created by Yura on 11.03.2017.
 */
'use strict';
var LS = JSON.parse(localStorage.getItem('HS_Project')) || {};

angular.element(document).ready(function() {
    angular.bootstrap(document, ['HS_Project']);
});

var roles = {
    Unauthorized: 0,
    Gamer: 1,
    Admin: 2,
};

if(typeof LS.roles == 'undefined') {
    LS.roles = ['Unauthorized'];
    localStorage.setItem('HS_Project', JSON.stringify(LS));
}

var HS_Project = angular.module('HS_Project', [
    'ngRoute',
    'angularLoad',
    'restangular',
    'ngRoute',
    'ngResource',
    'ngCookies',
    'HSControllers',
    'HSServices',
    'HSDirectives',
    'constants',
    'ngFileUpload',
    'ui.bootstrap'
]);

HS_Project.config(['$routeProvider', 'CONFIG',
    function ($routeProvider, CONFIG) {
        $routeProvider.
            when('/home', {
            templateUrl: 'templates/home.html',
            controller: "HomeController"
            }).
            when('/lobby', {
            templateUrl: 'templates/lobby.html',
            controller: "LobbyController"
            }).
            otherwise({
                redirectTo: '/'
            });
    }]);

// HS_Project.config(['RestangularProvider', 'CONFIG', function(RestangularProvider, CONFIG) {
//     RestangularProvider.setBaseUrl(CONFIG.API_URL);
// }]);

HS_Project.config(['$httpProvider', 'CONFIG', function($httpProvider, CONFIG) {
    //initialize get if not there
    if (!$httpProvider.defaults.headers.get) {
        $httpProvider.defaults.headers.get = {};
    }

    //disable IE ajax request caching
    $httpProvider.defaults.headers.get['Cache-Control'] = 'no-cache';
    $httpProvider.defaults.headers.get['Pragma'] = 'no-cache';
    $httpProvider.defaults.headers.get['Expires'] = 0;
}]);

HS_Project.run(['$rootScope', '$scope', '$window', '$location', 'Restangular',
    function ($rootScope, $scope, $window, $location, Restangular) {
        alert('project is running');
    }
]);
