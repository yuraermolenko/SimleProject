/**
 * Created by Yura on 11.03.2017.
 */
'use strict';
var LS = JSON.parse(localStorage.getItem('HS')) || {};

angular.element(document).ready(function () {
   angular.bootstrap(document, ['HS']);
});

var roles = {
   Unauthorized: 0,
   Gamer: 1,
   Admin: 2
};

if (typeof LS.roles == 'undefined') {
   LS.roles = ['Unauthorized'];
   localStorage.setItem('HS', JSON.stringify(LS));
}

var HS = angular.module('HS', [
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
   'pascalprecht.translate'
]);

HS.config(['$routeProvider',
   function ($routeProvider) {
      $routeProvider.when('/home', {
         templateUrl: 'templates/home.html',
         controller: "HomeController"
      }).when('/lobby', {
         templateUrl: 'templates/lobby.html',
         controller: "LobbyController"
      }).when('/login', {
         templateUrl: 'templates/login.html',
         controller: "LoginController"
      }).when('/registration', {
         templateUrl: 'templates/registration.html',
         controller: "RegistrationController"
      }).otherwise({
         redirectTo: '/home'
      });
   }]);

HS.config(['$httpProvider', function ($httpProvider) {
   //initialize get if not there
   if (!$httpProvider.defaults.headers.get) {
      $httpProvider.defaults.headers.get = {};
   }

   //disable IE ajax request caching
   $httpProvider.defaults.headers.get['Cache-Control'] = 'no-cache';
   $httpProvider.defaults.headers.get['Pragma'] = 'no-cache';
   $httpProvider.defaults.headers.get['Expires'] = 0;
}]);

HS.config(['$translateProvider', 'CONFIG', function ($translateProvider, CONFIG) {

   $translateProvider.useStaticFilesLoader({
      files: [{
         prefix: 'assets/languages/',
         suffix: '.json'
      }]
   });

   $translateProvider.preferredLanguage(CONFIG.DEFAULT_LANGUAGE);
   $translateProvider.useSanitizeValueStrategy('escapeParameters');
}]);

HS.run(['$rootScope', '$translate', '$timeout',
   function ($rootScope, $translate, $timeout) {
      $rootScope.switchLanguage = function (lang) {
         $translate.use(lang);
         LS.language = lang;
         $rootScope.language = lang;
         localStorage.setItem('HS', JSON.stringify(LS));
      };
   }
]);

HS.filter("sanitize", ['$sce', function ($sce) {
   return function (htmlCode) {
      return $sce.trustAsHtml(htmlCode);
   }
}]);