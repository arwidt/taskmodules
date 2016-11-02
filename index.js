

// var style_svgiconfont  = require('taskmodule__svgiconfont');
// var util_copy          = require('taskmodule__copy');
// var util_delete        = require('taskmodule__delete');

var _index = (function() {

    var _inst = {
        js: {
            get browserify() {
                try {
                    console.log(require.resolve("taskmodule__browserify"));
                } catch(e) {
                    console.error("taskmodule__browserify is not found run 'npm i taskmodule__browserify'");
                    process.exit(e.code);
                }
                return require('taskmodule__browserify');

            }
        },
        style: {
            get sass() {
                try {
                    console.log(require.resolve("taskmodule__sass"));
                } catch(e) {
                    console.error("taskmodule__sass is not found run 'npm i taskmodule__sass'");
                    process.exit(e.code);
                }
                return require('taskmodule__sass');
            },
            get svgIconFont() {
                return null;
            }
        },
        util: {
            get copy() {
                return null;
            },
            get del() {
                return null;
            }
        }
    };

    return _inst;

})();

module.exports = _index;