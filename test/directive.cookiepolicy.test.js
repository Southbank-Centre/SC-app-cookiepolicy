'use strict';

describe('Directive: cookiepolicy', function () {

  // load the directive's module
  beforeEach(module('sc.app.cookiepolicy'));
  beforeEach(module('ngCookies'));
  // Load in the ng-preprocessor templates
  beforeEach(module('sc.app.cookiepolicy.templates'));

  var $compile;
  var $scope;
  var $cookieStore;
  var element;

  // Inject dependencies to make them available to all tests.
  beforeEach(inject(function (_$rootScope_, _$compile_, _$cookieStore_) {
    // Initialise variables for use in all tests.
    $scope = _$rootScope_.$new();
    $compile = _$compile_;
    $cookieStore = _$cookieStore_;

    // Compile our directive and run the digest cycle to apply changes.
    element = $compile('<div sc-cookie-policy></div>')($scope);
    $scope.$digest();
  }));

  it('should contain the cookie policy template', function () {
    expect(element.html()).toContain('<div class="cookie-policy">');
    expect(element.html()).toContain('<div class="cookie-policy__text">');
    expect(element.html()).toContain('<div class="cookie-policy__buttons">');
  });

  it('should be able to check if a confirmation cookie exists', inject(function($cookieStore){
    // cookiePolicyAccepted should be False by default, so we should check that first.
    expect(element.scope().scCookiePolicyAccepted).toEqual(false);

    // Stub $cookieStore.get() and have it return true..
    var cookieStub = sinon.stub($cookieStore, 'get');

    // Stub $cookieStore.get() and have it return true.
    cookieStub
      .withArgs('scCookiePolicyAccepted')
      .returns(true);

    // Ensure that our cookie checking method on $scope returns true.
    expect(element.scope().checkCookiePolicyAccepted()).toEqual(true);

    // Ensure that our cookie checking method calls $cookieStore.get() once.
    expect($cookieStore.get.calledOnce).toEqual(true);

    // Stub $cookieStore.get() and have it return false.
    cookieStub
      .withArgs('scCookiePolicyAccepted')
      .returns(false);

    // Ensure that our cookie checking method on $scope returns false.
    expect(element.scope().checkCookiePolicyAccepted()).toEqual(false);

    // Stub $cookieStoretore.get() and have it return undefined
    cookieStub
      .withArgs('scCookiePolicyAccepted')
      .returns(undefined);

    // Ensure that our cookie checking method on $scope returns false.
    expect(element.scope().checkCookiePolicyAccepted()).toEqual(false);

    // Stub $cookieStoretore.get() and have it return an empty object
    cookieStub
      .withArgs('scCookiePolicyAccepted')
      .returns({});

    expect(element.scope().checkCookiePolicyAccepted()).toEqual(false);

    // Restore cookieStub to its original state.
    cookieStub.restore();
  }));

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
