//@ts-check
'use strict';
var through = require('through2');
var inline = require('./inline-image');

module.exports = function (opts) {

    function rebase(file, encoding, callback) {
        var self = this;

        inline.stylesheet(file, opts, function (err, src) {
            if (err) {
                console.error(err);
            }
            file.contents = Buffer.from(src);

            self.push(file);
            callback();
        });

    }

    return through.obj(rebase);
};