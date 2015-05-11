'use strict';

/**
 * @ngdoc directive
 * @name sc.cookiepolicy.directive:cookiepolicy
 * @description
 * Show a cookie policy notice.
 */
angular.module('sc.app.cookiepolicy', [])
  .directive('cookiePolicy', cookiePolicy);

function cookiePolicy() {
  return {
    templateUrl: 'templates/directive.cookiepolicy.tpl.html',
    restrict: 'A',
    link: function postLink(scope, element, attrs) {
    }
  };
}