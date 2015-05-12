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
              'dist/*.js',
              'test/*.js',
              'dist/**/*.html'
            ]
          }
        ],
        ngHtml2JsPreprocessor: {
          stripPrefix: 'dist/',
          moduleName: 'sc.app.cookiepolicy.templates'
        }

      }
    },

    uglify: {
      dist: {
        options: {
          sourceMap: true,
          sourceMapName: 'dist/directive.cookiepolicy.min.js.map'
        },
        files: {
          'dist/directive.cookiepolicy.min.js': 'src/directive.cookiepolicy.js'
        }
      }
    },

    htmlmin: {
      dist: {
        options: {
          removeComments: true,
          collapseWhitespace: true
        },
        files: {
          'dist/templates/directive.cookiepolicy.tpl.html': 'src/templates/directive.cookiepolicy.tpl.html'
        }
      }
    },

    copy: {
      dist: {
        src: './src/directive.cookiepolicy.js',
        dest: './dist/directive.cookiepolicy.js'
      }
    }

  });


  grunt.registerTask('build', [
    'jshint',
    'karma:unit',
    'copy:dist',
    'uglify',
    'htmlmin',
    'karma:dist'

  ]);

  grunt.registerTask('test', [
    'jshint',
    'karma:unit'
  ]);

  grunt.registerTask('default', ['test']);
};
