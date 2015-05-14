# Southbank Centre App: Cookie Policy

## Installation

1. Run the following command in your app's root directory `$ bower install --save Southbank-Centre/SC-app-cookiepolicy`

2. Add `SC-app-cookiepolicy` to the dependency list in **[YourAppName].module.js**

## Usage

Add the following directive anywhere in your application

```
<div sc-cookie-policy 	irights-page="PATH" cookie-page="PATH"></div>
```

Both attributes are required and are explained below:

### irights-page

Accepts: `string`

This is the path to the iRights principles page in your app.

### cookie-page

Accepts: `string`

This is the path to the cookie policy page in your app.

## Contributing

### Standards

All code should have unit test coverage, and be linted using the provided .`jshintrc` file.

### Creating a build

1. Ensure you have run `npm install`, as all unit tests and lifting is run pre-build.
2. Run `grunt build`
3. If there are no errors thrown, you may commit the new build.
4. If you are creating a release as well, ensure you update the release numbers on both the `bower.son` and `package.json` files.

### Testing

Unit tests are written using a combination of [Karma](https://karma-runner.github.io/0.12/index.html), [Jasmine](https://jasmine.github.io/) and [PhantomJS](http://phantomjs.org/). As a result of this, you will require PhantomJS and the Karma CLI to be installed globally until the configuration is changed to allow for project specific packages.

To get set up for unit testing, clone this repository and run `npm install` and `bower install`. This will install all component specific requirements. After than, run `grunt test` to test the component on an ad hoc basis, or run `karma start` to watch your files for any changes and test as you go.