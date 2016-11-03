

// var style_svgiconfont  = require('taskmodule__svgiconfont');
// var util_copy          = require('taskmodule__copy');
// var util_delete        = require('taskmodule__delete');

var _index = (function() {

    var _inst = {
        js: {
            get browserify() {
                try {
                    require.resolve("taskmodule__browserify");
                } catch(e) {
                    console.error("taskmodule__browserify is not found, run 'npm i taskmodule__browserify'");
                    process.exit(e.code);
                }
                return require('taskmodule__browserify');

            }
        },
        style: {
            get sass() {
                try {
                    require.resolve("taskmodule__sass");
                } catch(e) {
                    console.error("taskmodule__sass is not found, run 'npm i taskmodule__sass'");
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
                try {
                    require.resolve("taskmodule__copy");
                } catch(e) {
                    console.error("taskmodule__copy is not found, run 'npm i taskmodule__copy'");
                    process.exit(e.code);
                }
                return require('taskmodule__copy');
            },
            get del() {
                try {
                    require.resolve("taskmodule__delete");
                } catch(e) {
                    console.error("taskmodule__delete is not found, run 'npm i taskmodule__delete'");
                    process.exit(e.code);
                }
                return require('taskmodule__delete');
            }
        }
    };

    return _inst;

})();

module.exports = _index;