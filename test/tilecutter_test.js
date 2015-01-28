'use strict';

var grunt = require('grunt'),
    gdal = require('gdal');

exports.tilecutter = {
    setUp: function (done) {
        done();
    },
    default_options: function (test) {
        test.expect(7);

        var actual = gdal.open('tmp/source-4096x4096-default.tif');
        var expected = gdal.open('test/expected/source-4096x4096-default.tif');

        test.equal(actual.geoTransform, expected.geoTransform, 'default translated file has correct geoTransform.');
        test.equal(actual.srs, expected.srs, 'default translated file has correct srs.');
        test.equal(actual.rasterSize.x, expected.rasterSize.x, 'default translated file has correct x-scale rasterSize.');
        test.equal(actual.rasterSize.y, expected.rasterSize.y, 'default translated file has correct y-scale rasterSize.');
        test.equal(actual.bands.count(), expected.bands.count(), 'default translated file has correct bands.');
        test.equal(actual.layers.count(), expected.layers.count(), 'default translated file has correct layers.');
        test.equal(actual.description, 'tmp/source-4096x4096-default.tif', 'default translated file has correct description.');
        test.done();
    },
    custom_options: function (test) {
        test.expect(7);

        var actual = gdal.open('tmp/source-4096x4096-custom.tif');
        var expected = gdal.open('test/expected/source-4096x4096-custom.tif');

        test.equal(actual.geoTransform, expected.geoTransform, 'default translated file has correct geoTransform.');
        test.equal(actual.srs, expected.srs, 'default translated file has correct srs.');
        test.equal(actual.rasterSize.x, expected.rasterSize.x, 'default translated file has correct x-scale rasterSize.');
        test.equal(actual.rasterSize.y, expected.rasterSize.y, 'default translated file has correct y-scale rasterSize.');
        test.equal(actual.bands.count(), expected.bands.count(), 'default translated file has correct bands.');
        test.equal(actual.layers.count(), expected.layers.count(), 'default translated file has correct layers.');
        test.equal(actual.description, 'tmp/source-4096x4096-custom.tif', 'default translated file has correct description.');
        test.done();
    }
};