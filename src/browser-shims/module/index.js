'use strict';
var path = require('path');

var Module = {
    _nodeModulePaths: function() {
        return [];
    },

    _resolveFilename: function(target, fromModule) {
        var fromDir = path.dirname(fromModule.filename);
        return path.join(fromDir, target);
    }
};

module.exports = Module;

Module.Module = Module;
