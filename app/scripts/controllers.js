/**
 * Created by Yura on 11.03.2017.
 */
var HSControllers = angular.module('HSControllers');

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
