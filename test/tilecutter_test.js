'use strict';

var grunt = require('grunt'),
    gdal = require('gdal');

exports.tilecutter = {
    setUp: function (done) {
        done();
    },
    default_options: function (test) {
        test.expect(5);

        var actual = gdal.open('tmp/source-4096x4096-default.tif');

        test.equal(actual.rasterSize.x, 4096, 'default translated file has correct x-scale rasterSize.');
        test.equal(actual.rasterSize.y, 4096, 'default translated file has correct y-scale rasterSize.');
        test.equal(actual.bands.count(), 3, 'default translated file has correct bands.');
        test.equal(actual.layers.count(), 0, 'default translated file has correct layers.');
        test.equal(actual.description, 'tmp/source-4096x4096-default.tif', 'default translated file has correct description.');
        test.done();
    },
    custom_options: function (test) {
        test.expect(5);

        var actual = gdal.open('tmp/source-4096x4096-custom.tif');

        test.equal(actual.rasterSize.x, 4096, 'default translated file has correct x-scale rasterSize.');
        test.equal(actual.rasterSize.y, 4096, 'default translated file has correct y-scale rasterSize.');
        test.equal(actual.bands.count(), 3, 'default translated file has correct bands.');
        test.equal(actual.layers.count(), 0, 'default translated file has correct layers.');
        test.equal(actual.description, 'tmp/source-4096x4096-custom.tif', 'default translated file has correct description.');
        test.done();
    }
};