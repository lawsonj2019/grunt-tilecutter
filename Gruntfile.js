/*
 * grunt-tilecutter
 * https://github.com/jlawson/grunt-tilecutter
 *
 * Copyright (c) 2015 James Lawson
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        jshint: {
            all: [
                'Gruntfile.js',
                'tasks/*.js',
                '<%= nodeunit.tests %>'
            ],
            options: {
                jshintrc: '.jshintrc'
            }
        },

        // Before generating any new files, remove any previously-created files.
        clean: {
            tests: ['tmp']
        },

        // Configuration to be run (and then tested).
        tilecutter: {
            default_options: {
                options: {
                    latitude: {
                        west: -15,
                        east: 15
                    },
                    longitude: {
                        north: 15,
                        south: -15
                    }
                },
                files: [{
                    expand: true,
                    cwd: 'test/fixtures/',
                    src: ['**/*default.jpg'],
                    dest: 'tmp/',
                    ext: '.tif'
                }]
            },
            custom_options: {
                options: {
                    projection: 'EPSG:4326',
                    resampling: 'lanczos',
                    latitude: {
                        west: -10,
                        east: 10
                    },
                    longitude: {
                        north: 10,
                        south: -10
                    },
                    minZoom: 1,
                    maxZoom: 3,
                    tiles: 'tmp/custom'
                },
                files: [{
                    expand: true,
                    cwd: 'test/fixtures/',
                    src: ['**/*custom.jpg'],
                    dest: 'tmp/',
                    ext: '.tif'
                }]
            },
            starfield: {
                options: {
                    projection: 'EPSG:4326',
                    latitude: {
                        west: -180,
                        east: 180
                    },
                    longitude: {
                        north: 15,
                        south: -15
                    },
                    minZoom: 1,
                    maxZoom: 5,
                    tiles: 'tmp/starfield'
                },
                files: [{
                    expand: true,
                    cwd: 'test/fixtures/',
                    src: ['starfield-4800x400.jpg'],
                    dest: 'tmp/',
                    ext: '.tif'
                }]
            }
        },

        // Unit tests.
        nodeunit: {
            tests: ['test/*_test.js']
        }

    });

    // Actually load this plugin's task(s).
    grunt.loadTasks('tasks');

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-nodeunit');

    // Whenever the "test" task is run, first clean the "tmp" dir, then run this
    // plugin's task(s), then test the result.
    grunt.registerTask('test', ['clean', 'tilecutter', 'nodeunit']);

    // By default, lint and run all tests.
    grunt.registerTask('default', ['jshint', 'test']);

};
