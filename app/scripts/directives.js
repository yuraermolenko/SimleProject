/**
 * Created by Yura on 11.03.2017.
 */
var HSDirectives = angular.module('HSDirectives', []);

HSDirectives.directive('hsHeader', ['CONFIG',
    function (CONFIG) {
        return {
            restrict: "E",
            controller: "HeaderController",
            templateUrl: "templates/header.html",
            link: function (scope, element) {
                
            }
        }
}]);

HSDirectives.directive('onlyEnglishNumbers', [ function () {
    return {
        require: 'ngModel',
        link: function(scope, element, attrs, ctrl) {
            //Comment to test digest
            scope.$watch(attrs.ngModel, function () {
                ctrl.$validators.onlyEnglishNumbers = function(modelValue, viewValue) {
                    if (modelValue.match(/[^\dA-Z]/gi)){
                        return false;
                    }
                    return (typeof modelValue.length == 'undefined') ? !ctrl.$isEmpty(modelValue) && modelValue.toString().length > 1 :
                         !modelValue.match(/[^\dA-Z]/gi);
                };
            }, true);
        }
    }
}]);

HSDirectives.directive('checkEmail', [function() {
    var EMAIL_REGEXP = /^[_a-zA-Z0-9\-]+(\.[_a-zA-Z0-9+]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[a-zA-Z]{2,4})$/;

    return {
        require: 'ngModel',
        link: function(scope, element, attrs, ctrl) {
            //Comment to test digest
            scope.$watch(attrs.ngModel, function () {
                if (ctrl && ctrl.$validators.email) {
                    ctrl.$validators.checkEmail = function(modelValue) {
                        return (!ctrl.$isEmpty(modelValue)) && (EMAIL_REGEXP.test(modelValue));
                    };
                }
            }, true);
        }
    }
}]);

HSDirectives.directive('passwordMinSixSymbols', [function () {
    return {
        require: 'ngModel',
        link: function(scope, element, attrs, ctrl) {
            //Comment to test digest
            scope.$watch(attrs.ngModel, function () {
                ctrl.$validators.passwordMinSixSymbols = function(modelValue, viewValue) {
                    return (typeof modelValue.length == 'undefined') ? !ctrl.$isEmpty(modelValue) && modelValue.toString().length > 5 : !ctrl.$isEmpty(modelValue) && modelValue.length > 5 ;
                };
            }, true);
        }
    }
}]);