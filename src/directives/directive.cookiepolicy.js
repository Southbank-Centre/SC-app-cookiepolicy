'use strict';

/**
 * @ngdoc directive
 * @name sc.cookiepolicy.directive:cookiepolicy
 * @description
 * Show a cookie policy notice.
 */
angular.module('sc.cookiepolicy', [])
  .directive('cookiepolicy', cookiePolicy);

function cookiePolicy() {
  return {
    templateUrl: 'templates/directive.cookiepolicy.html',
    restrict: 'A',
    link: function postLink(scope, element, attrs) {
      element.text('this is the scCookiepolicy directive');
    }
  };
}