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
    }
  });


  grunt.registerTask('build', [

  ]);

  grunt.registerTask('test', [

  ]);

  grunt.registerTask('default', ['test']);
};
