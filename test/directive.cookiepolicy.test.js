'use strict';

describe('Directive: cookiepolicy', function () {

  // load the directive's module
  beforeEach(module('sc.app.cookiepolicy'));
  // Load in the ng-preprocessor templates
  beforeEach(module('sc.app.cookiepolicy.templates'));

  var $compile,
      $rootScope,
      $scope;

  // Inject dependencies to make them available to all tests.
  beforeEach(inject(function (_$rootScope_, _$compile_) {
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    $scope = $rootScope.$new();
  }));

  it('should contain the cookie policy template', function () {
    var element = '<div cookie-policy></div>';
    var template = $compile(element)($scope);

    // We need to kick off a $digest cycle to update the template for some reason.
    $scope.$apply();

    // Get the template's HTML content.
    var templateHtml = template.html();

    expect(templateHtml).toContain('<div class="cookie-policy">');
    expect(templateHtml).toContain('<div class="cookie-policy__text">');
    expect(templateHtml).toContain('<div class="cookie-policy__buttons">');
  });

  it('should be able to check if a confirmation cookie exists', function(){
    // ToDo: Remove this once all test are written.
    expect(false).toBeTruthy();
  });

  it('should be shown if no cookie is set', function () {
    // ToDo: Remove this once all test are written.
    expect(false).toBeTruthy();
  });

  it('should be hidden if a cookie is set', function () {
    // ToDo: Remove this once all test are written.
    expect(false).toBeTruthy();
  });

  it('should set a cookie when the accept button is clicked', function () {
    // ToDo: Remove this once all test are written.
    expect(false).toBeTruthy();
  });

  it('should change links based on configuration', function () {
    // ToDo: Remove this once all test are written.
    expect(false).toBeTruthy();
  });

});
