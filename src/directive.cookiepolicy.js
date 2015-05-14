'use strict';

/**
 * @ngdoc directive
 * @name SC-app-cookiepolicy.directive:scCookiePolicy
 * @description
 * Show a cookie policy notice.
 * @example <div sc-cookie-policy irights-page="irightsTest" cookie-page="cookiePageTest"></div>
 */
angular
  .module('SC-app-cookiepolicy', [])
  .directive('scCookiePolicy', scCookiePolicy);

scCookiePolicy.$inject = ['$cookieStore'];

function scCookiePolicy($cookieStore) {
  var ddo = {
    restrict: 'A',
    templateUrl: 'templates/directive.cookiepolicy.tpl.html',
    scope: {
      iRightsPage: '@irightsPage',
      cookiePage: '@cookiePage'
    },
    link: link
  };

  function link($scope) {

    // Check if the acceptance cookie has been set.
    $scope.checkCookiePolicyAccepted = function(){
      var policyAccepted = $cookieStore.get('scCookiePolicyAccepted');

      // If the policy has been accepted, then we can return true.
      if (policyAccepted === true) {
        return true;
      }

      // For anything that is not true (i.e. undefined, {}, foobar) we return false.
      return false;
    };

    // Set the policy cookie. This is called in an nc-click() directive in the directive template.
    $scope.setPolicyCookie = function(){
      $cookieStore.put('scCookiePolicyAccepted', true);
      $scope.scCookiePolicyAccepted = true;
    };

    $scope.scCookiePolicyAccepted = $scope.checkCookiePolicyAccepted();
  }

  return ddo;
}

