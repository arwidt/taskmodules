
var js_browserify      = require('taskmodule__browserify');
var style_sass         = require('taskmodule__sass');
var style_svgiconfont  = require('taskmodule__svgiconfont');
var util_copy          = require('taskmodule__copy');
var util_delete        = require('taskmodule__delete');

var _index = (function() {

    var _inst = {
        js: {
            browserify: js_browserify
        },
        style: {
            sass: style_sass,
            svgIconFont: style_svgiconfont
        },
        util: {
            copy: util_copy,
            del: util_delete
        }
    };

    return _inst;

})();

module.exports = _index;