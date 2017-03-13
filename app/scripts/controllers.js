/**
 * Created by Yura on 11.03.2017.
 */
var HSControllers = angular.module('HSControllers', []);

HSControllers.controller('HomeController', ['$scope', '$rootScope',
   function ($scope, $rootScope) {
      $scope.user = "Yura";
      $rootScope.title = 'Home';

   }]);

HSControllers.controller('LobbyController', ['$scope', '$rootScope',
   function ($scope, $rootScope) {
      $scope.user = "Ilya";
      $rootScope.title = 'Lobby';
   }]);

HSControllers.controller('HeaderController', ['$scope', '$rootScope', '$translate', '$location',
   function ($scope, $rootScope, $translate, $location) {
      if (typeof LS.language != 'undefined') {
         $translate.use(LS.language);
         $rootScope.language = LS.language;
      }
      $scope.path = $location.path().slice(1);
      $scope.$on('$routeChangeStart', function () {
         $scope.path = $location.path().slice(1);
      })
   }]);

HSControllers.controller('RegistrationController', ['$scope',
   function ($scope) {
      $scope.user = {};
      $scope.submit = function () {
         console.log("$scope.user", $scope.user);
      };
   }]);

