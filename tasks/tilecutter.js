/*
 * grunt-tilecutter
 * https://github.com/jlawson/tilecutter-grunt
 *
 * Copyright (c) 2015 James Lawson
 * Licensed under the MIT license.
 */

'use strict';


var gdal = require('gdal'),
    chalk = require('chalk');

module.exports = function (grunt) {

    grunt.registerMultiTask('tilecutter', 'Tilecutter Plugin', function () {
        var complete = this.async();

        // Merge task-specific and/or target-specific options with these defaults.
        var options = this.options({
            projection: 'WGS84',
            resampling: 'near',
            minZoom: 1,
            maxZoom: 5
        });

        // Iterate over all specified file groups.
        this.files.forEach(function (f) {

            options.tiles = options.tiles || f.orig.dest + 'tiles/';

            var src = f.src.filter(function (filepath) {
                if (!grunt.file.exists(filepath)) {
                    grunt.log.warn('Source file', chalk.cyan(filepath), 'not found.');
                    return false;
                } else {
                    return true;
                }
            }).map(function (filepath) {

                // need to get the dimensions of the source file

                var dataset = gdal.open(filepath);
                var x = dataset.rasterSize.x,
                    y = dataset.rasterSize.y;

                grunt.file.mkdir(f.orig.dest);

                grunt.util.spawn({
                    cmd: 'gdal_translate',
                    args: [
                        '-a_srs', options.projection,
                        '-gcp', '0', '0', options.latitude.west, options.longitude.north,
                        '-gcp', x, '0', options.latitude.east, options.longitude.north,
                        '-gcp', x, y, options.latitude.east, options.longitude.south,
                        filepath,
                        f.dest
                    ]
                }, function done(error, result, code) {
                    if(error) {
                        grunt.log.error('Could not translate', filepath);
                        grunt.log.error(error);
                        complete();
                        return false;
                    } else {
                        grunt.log.writeln('Translated', chalk.cyan(filepath), 'to', chalk.cyan(f.dest));

                        grunt.util.spawn({
                            cmd: 'gdalwarp',
                            args: [
                                '-s_srs', options.projection,
                                '-r', options.resampling,
                                f.dest,
                                f.dest
                            ]
                        }, function done(error, result, code) {
                            if(error) {
                                grunt.log.error('Could not warp', f.dest);
                                grunt.log.error(error);
                                complete();
                                return false;
                            } else {
                                grunt.log.writeln('Warped', chalk.cyan(f.dest), 'to', chalk.cyan(f.dest));

                                grunt.util.spawn({
                                    cmd: 'python',
                                    args: [
                                        'tasks/gdaltiler.py',
                                        '-r', options.resampling,
                                        '-z', options.minZoom + '-' + options.maxZoom,
                                        '-w', 'none',
                                        f.dest,
                                        options.tiles
                                    ]
                                }, function done(error, result, code) {
                                    if(error) {
                                        grunt.log.error('Could not tile', f.dest);
                                        grunt.log.error(error);
                                        complete();
                                        return false;
                                    } else {
                                        grunt.log.writeln('Tiled', chalk.cyan(f.dest), 'to', chalk.cyan(options.tiles));
                                        complete();
                                        return true;
                                    }
                                });
                            }
                        });
                        return true;
                    }
                });

                var template = grunt.file.read('map.html.tpl');
                var templateOptions = {
                    data: {
                        north: options.longitude.north,
                        east: options.latitude.east,
                        south: options.longitude.south,
                        west: options.latitude.west,
                        minZoom: options.minZoom,
                        maxZoom: options.maxZoom,
                        mapZoom: Math.floor((options.maxZoom - options.minZoom)/2)
                    }
                };
                var result = grunt.template.process(template, templateOptions);
                grunt.file.write(options.tiles + '/map.html', result);

            });

        });

    });

};

