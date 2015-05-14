'use strict';

/**
 * @ngdoc directive
 * @name sc.cookiepolicy.directive:cookiepolicy
 * @description
 * Show a cookie policy notice.
 * @example <div acme-shared-spinner></div>
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

    $scope.checkCookiePolicyAccepted = function(){
      var policyAccepted = $cookieStore.get('scCookiePolicyAccepted');

      // If the policy has been accepted, then we can return true.
      if (policyAccepted === true) {
        return true;
      }

      // For anything that is not true (i.e. undefined, {}, foobar) we return false.
      return false;
    };

    $scope.setPolicyCookie = function(){
      $cookieStore.put('scCookiePolicyAccepted', true);
      $scope.scCookiePolicyAccepted = true;
    };

    $scope.scCookiePolicyAccepted = $scope.checkCookiePolicyAccepted();

  }

  return ddo;
}

angular.module('SC-app-cookiepolicy').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('templates/directive.cookiepolicy.tpl.html',
    "<div id=cookie-policy class=cookie-policy ng-hide=scCookiePolicyAccepted><div class=cookie-policy__text>Our website uses small files called cookies to help us customise your experience. Full details of what these are can be found in our <a id=cookie-policy-link class=cookie-policy__test--link ng-href=\"{{ cookiePage }}\" href=\"{{ cookiePage }}\">Cookies policy</a>.<br>We also support the <a id=irights-principles-link class=cookie-policy__test--link ng-href=\"{{ iRightsPage }}\" href=\"{{ iRightsPage }}\">iRights principles</a> which promote safer access to the internet for children and young people.</div><div class=cookie-policy__buttons><button id=cookie-policy__confirm class=\"cookie-policy__buttons--button cookie-policy__buttons--confirm\" ng-click=setPolicyCookie()>Got it, thanks!</button></div></div>"
  );

}]);
