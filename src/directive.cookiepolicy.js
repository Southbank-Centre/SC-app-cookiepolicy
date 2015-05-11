'use strict';

/**
 * @ngdoc directive
 * @name sc.cookiepolicy.directive:cookiepolicy
 * @description
 * Show a cookie policy notice.
 * @example <div acme-shared-spinner></div>
 */
angular
  .module('sc.app.cookiepolicy', [])
  .directive('scCookiePolicy', scCookiePolicy);

scCookiePolicy.$inject = ['$cookieStore'];

function scCookiePolicy($cookieStore) {
  var ddo = {
    restrict: 'A',
    templateUrl: 'templates/directive.cookiepolicy.tpl.html',
    scope: true,
    link: link
  };

  function link($scope, $element, $attrs) {

    $scope.scCookiePolicyAccepted = false;

    $scope.checkCookiePolicyAccepted = function(){
      var policyAccepted = $cookieStore.get('scCookiePolicyAccepted');

      // If the policy has been accepted, then we can return true.
      if (policyAccepted === true) {
        return true;
      }

      // For anything that is not true (i.e. undefined, {}, foobar) we return false.
      return false;
    }

  }

  return ddo;
}

