'use strict';

describe('Directive: cookiepolicy', function () {

  ////////////////////
  // SETUP/TEARDOWN
  ////////////////////

  var $compile;
  var $scope;
  var $cookieStore;
  var el;

  // Load the directive's module and dependencies.
  beforeEach(module('SC-app-cookiepolicy'));
  beforeEach(module('ngCookies'));

  // Load in the ng-preprocessor templates
  beforeEach(module('sc.app.cookiepolicy.templates'));

  // Inject dependencies to make them available to all tests.
  beforeEach(inject(function (_$rootScope_, _$compile_, _$cookieStore_) {
    // Initialise variables for use in all tests.
    $scope = _$rootScope_.$new();
    $compile = _$compile_;
    $cookieStore = _$cookieStore_;

    // Compile our directive and run the digest cycle to apply changes.
    el = $compile('<div sc-cookie-policy irights-page="irightsTest" cookie-page="cookiePageTest"></div>')($scope);
    $scope.$digest();
  }));

  // Perform any teardown tasks.
  afterEach(inject(function($cookieStore){
    // Clear out the accepted cookie after each test just in case.
    $cookieStore.remove('scCookiePolicyAccepted');

    // Reset the scCookiePolicyAccepted property to its default value.
    el.isolateScope().scCookiePolicyAccepted = false;
    el.isolateScope().$digest();
  }));

  ////////////////////
  // TESTS
  ///////////////////

  it('should contain the cookie policy template', function () {
    //expect(element.html()).toContain('<div class="cookie-policy">');
    expect(el.html()).toContain('<div class="cookie-policy__text">');
    expect(el.html()).toContain('<div class="cookie-policy__buttons">');
  });

  it('should be able to check if a confirmation cookie exists', inject(function($cookieStore){
    // cookiePolicyAccepted should be False by default, so we should check that first.
    expect(el.isolateScope().scCookiePolicyAccepted).toEqual(false);

    // Stub $cookieStore.get() and have it return true..
    var cookieStub = sinon.stub($cookieStore, 'get');

    // Stub $cookieStore.get() and have it return true.
    cookieStub
      .withArgs('scCookiePolicyAccepted')
      .returns(true);

    // Ensure that our cookie checking method on $scope returns true.
    expect(el.isolateScope().checkCookiePolicyAccepted()).toEqual(true);

    // Ensure that our cookie checking method calls $cookieStore.get() once.
    expect($cookieStore.get.calledOnce).toEqual(true);

    // Stub $cookieStore.get() and have it return false.
    cookieStub
      .withArgs('scCookiePolicyAccepted')
      .returns(false);

    // Ensure that our cookie checking method on $scope returns false.
    expect(el.isolateScope().checkCookiePolicyAccepted()).toEqual(false);

    // Stub $cookieStoretore.get() and have it return undefined
    cookieStub
      .withArgs('scCookiePolicyAccepted')
      .returns(undefined);

    // Ensure that our cookie checking method on $scope returns false.
    expect(el.isolateScope().checkCookiePolicyAccepted()).toEqual(false);

    // Stub $cookieStoretore.get() and have it return an empty object
    cookieStub
      .withArgs('scCookiePolicyAccepted')
      .returns({});

    expect(el.isolateScope().checkCookiePolicyAccepted()).toEqual(false);

    // Restore cookieStub to its original state.
    cookieStub.restore();
  }));

  it('should be shown if the cookie policy has not been accepted', function () {
    // Set scCookiePolicyAccepted on $scope to be false.
    el.isolateScope().scCookiePolicyAccepted = false;
    // Run a digestion cycle to update the directive.
    // ToDo: Check if this should be done, or should we implement $watch?
    el.isolateScope().$digest();
    // Check that ng-hide has kicked in appropriately.
    var hidden = el.children().eq(0).hasClass('ng-hide');
    expect(hidden).toBe(false);
  });

  it('should be hidden if the cookie policy has been accepted', function () {
    // Set scCookiePolicyAccepted on $scope to be false.
    el.isolateScope().scCookiePolicyAccepted = true;
    // Run a digestion cycle to update the directive.
    // ToDo: Check if this should be done, or should we implement $watch?
    el.isolateScope().$digest();
    // Check that ng-hide has kicked in appropriately.
    var hidden = el.children().eq(0).hasClass('ng-hide');
    expect(hidden).toBe(true);
  });

  it('should set a cookie when the accept button is clicked', function () {

    // Spy on setPolicyCookie
    sinon.spy(el.isolateScope(), "setPolicyCookie");

    var event = document.createEvent("MouseEvent");
    event.initMouseEvent("click", true, true);

    // There's only one button for now, but if this changes we may need to refactor this test.
    var button = el.find('button');
    button[0].dispatchEvent(event);

    expect(el.isolateScope().setPolicyCookie.callCount).toEqual(1);
    expect(el.isolateScope().checkCookiePolicyAccepted()).toEqual(true);
    expect(el.isolateScope().scCookiePolicyAccepted).toEqual(true);
    expect($cookieStore.get('scCookiePolicyAccepted')).toBe(true);

    // Remove the spy from el.scope().setPolicyCookie().
    el.isolateScope().setPolicyCookie.restore();
  });

  it('should accept links as configuration on the directive', function(){
    expect(el.isolateScope().iRightsPage).toEqual('irightsTest');
    expect(el.isolateScope().cookiePage).toEqual('cookiePageTest');
  });

  it('should change links based on configuration', function () {
    el.isolateScope().cookiePage = "Lannister";
    el.isolateScope().iRightsPage = "Stark";
    el.isolateScope().$digest();

    expect(el.find('a')[0].getAttribute('ng-href')).toEqual("Lannister");
    expect(el.find('a')[1].getAttribute('ng-href')).toEqual("Stark");

    el.isolateScope().cookiePage = "Durrandon";
    el.isolateScope().iRightsPage = "Arryn";
    el.isolateScope().$digest();

    expect(el.find('a')[0].getAttribute('ng-href')).toEqual("Durrandon");
    expect(el.find('a')[1].getAttribute('ng-href')).toEqual("Arryn");

    el.isolateScope().$digest();
  });

  it('should set the default value to true if the scCookiePolicyAccepted cookie exists', function(){
    // Ensure that the cookie is not set.
    expect(el.isolateScope().scCookiePolicyAccepted).toEqual(false);
    // Set the cookie.
    $cookieStore.put('scCookiePolicyAccepted', true);

    // Compile a new element.
    var newEl = $compile('<div sc-cookie-policy irights-page="irightsTest" cookie-page="cookiePageTest"></div>')($scope);
    $scope.$digest();

    // Ensure that the isolated scope value for scCookiePolicyAccepted is true.
    expect(newEl.isolateScope().scCookiePolicyAccepted).toBe(true);
  });

});
