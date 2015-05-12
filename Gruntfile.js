'use strict';

module.exports = function (grunt) {

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  grunt.initConfig({
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      tests: {
        src: ['src/**/*.js']
      },
      src: {
        src: ['test/**/*.js']
      }
    },

    karma: {
      unit: {
        configFile: 'karma.conf.js',
        singleRun: true
      },
      dist: {
        configFile: 'karma.conf.js',
        singleRun: true,
        files: [
          {
            src: [
              'bower_components/angular/angular.min.js',
              'bower_components/angular-cookies/angular-cookies.min.js',
              'bower_components/angular-mocks/angular-mocks.js',
              'release/*.js',
              'test/*.js',
              'release/**/*.html'
            ]
          }
        ],
        ngHtml2JsPreprocessor: {
          stripPrefix: 'release/',
          moduleName: 'sc.app.cookiepolicy.templates'
        }

      }
    },

    uglify: {
      dist: {
        options: {
          sourceMap: true,
          sourceMapName: 'release/directive.cookiepolicy.min.js.map'
        },
        files: {
          'release/directive.cookiepolicy.min.js': 'src/directive.cookiepolicy.js'
        }
      }
    },

    copy: {
      dist: {
        src: './src/directive.cookiepolicy.js',
        dest: './release/directive.cookiepolicy.js'
      }
    }

  });


  grunt.registerTask('build', [
    'jshint',
    'karma:unit',
    'copy:dist',
    'uglify',
    'karma:dist'

  ]);

  grunt.registerTask('test', [
    'jshint',
    'karma:unit'
  ]);

  grunt.registerTask('default', ['test']);
};
