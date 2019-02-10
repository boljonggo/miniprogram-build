///@ts-check
'use strict';
var gulp = require('gulp');
var fs = require('fs');
var log = require('fancy-log');
var colors = require('ansi-colors');

var unlink = require('../lib/unlink');
var buildNpm = require('../compiler/build-npm');
var copy = require('../compiler/copy');

var PACKAGE_JSON = 'package.json';
/**
 * @param {object} config
 */
exports.build = function (config) {
    return function () {
        if (!fs.existsSync(PACKAGE_JSON)) {
            return;
        }
        if (!fs.existsSync('node_modules')) {
            log(
                colors.red('npm:'),
                colors.yellowBright('node_modules/ doesn\'t exist! please run `' + colors.bgRedBright('npm i') + '`'),
            );
            return;
        } else {
            return buildNpm(config);
        }
    };
}

/**
 * @param {object} config
 */
exports.watch = function (config) {
    return function (cb) {
        return gulp.watch(PACKAGE_JSON, {})
            .on('change', function (file) { return copy(config.dist, file, config.src); })
            .on('add', exports.build(config))
            .on('unlink', unlink(config.src, config.dist));
    }
}