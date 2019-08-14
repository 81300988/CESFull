'use strict';

module.exports = (grunt) => {
  // configure grunt
  grunt.initConfig(require('./grunt'));

  // load grunt tasks
  grunt.loadNpmTasks('grunt-eslint');

  // define grunt tasks
  grunt.registerTask('default', ['eslint', 'todo']);
};