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
      }
    },

    uglify: {
      dist: {
        options: {
          sourceMap: true,
          sourceMapName: 'release/SC-app-cookiepolicy.min.js.map'
        },
        files: {
          'release/SC-app-cookiepolicy.min.js': 'release/SC-app-cookiepolicy.js'
        }
      }
    },

    ngtemplates: {
      app: {
        src: 'src/templates/*.html',
        dest: 'release/SC-app-cookiepolicy.js',
        options: {
          module: 'sc.app.cookiepolicy',
          standalone: true,
          url: function(url) {
            return url.replace('src/', '');
          },
          htmlmin: {
            collapseBooleanAttributes:      true,
            collapseWhitespace:             true,
            removeAttributeQuotes:          true,
            removeComments:                 true, // Only if you don't use comment directives!
            removeEmptyAttributes:          true,
            removeRedundantAttributes:      true,
            removeScriptTypeAttributes:     true,
            removeStyleLinkTypeAttributes:  true
          },
          append: 'release/SC-app-cookiepolicy.js'
        }
      }
    },

    copy: {
      dist: {
        src: 'src/directive.cookiepolicy.js',
        dest: 'release/SC-app-cookiepolicy.js'
      }
    },

    clean: {
      dist: 'release'
    }

  });


  grunt.registerTask('build', [
    'jshint',
    'karma:unit',
    'clean:dist',
    'copy:dist',
    'ngtemplates',
    'uglify'
  ]);

  grunt.registerTask('test', [
    'jshint',
    'karma:unit'
  ]);

  grunt.registerTask('default', ['test']);
};
