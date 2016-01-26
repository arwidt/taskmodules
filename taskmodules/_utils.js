
var gulp = require('gulp');
var del = require('del');
var fs = require('fs');
var _ = require('lodash');
var async = require('async');
var fse = require('node-fs-extra');


global.remove = {};
global.remove.reset = function() {
    return function(callback) {
        console.log("FILES: reset:".blue, "Start".red);
        del.sync('public/assets');
        del.sync('public/fonts');
        del.sync('public/locale');
        del.sync('resources/assets/sass/libs/');
        del.sync('resources/assets/font_files/icons/');
        console.log("FILES: reset:".blue, "Complete".green);
        callback();
    }
};

global.remove.trashfiles = function() {
    return function(callback) {
        console.log("FILES: remove trashfiles:".blue, "Start".red);

        del.sync(['resources/**/._*', 'resources/.DS_Store', 'resources/**/*.orig']);

        console.log("FILES: remove trashfiles:".blue, "Complete".green);
        callback();
    }
};

global.copy = {};
global.copy.sasslibs = function() {
    return function(callback) {
        console.log("FILES: move sass libs:".blue, "Start".red);

        fse.copySync('node_modules/susy/sass', 'resources/assets/sass/libs/susy');
        fse.copySync('node_modules/breakpoint-sass/stylesheets', 'resources/assets/sass/libs/breakpoint-sass');

        console.log("FILES: move sass libs:".blue, "Complete".green);

        callback();

    }
};

global.copy.locale = function(production) {
    return function(callback) {
        console.log("FILES: move locale badges:".blue, "Start".red);

        fse.copySync('resources/assets/locale', 'public/assets/locale');

        console.log("FILES: move locale badges:".blue, "Complete".green);

        callback();
    };
};

global.copy.fonts = function(production) {
    return function(callback) {
        console.log("FILES: move fonts:".blue, "Start".red);

        del.sync('resources/assets/font_files/icons/');
        if (production) {
            fse.copySync('resources/assets/font_files', 'public/assets/fonts/');
        } else {
            fse.copySync('resources/assets/font_files', 'public/fonts/');
        }

        console.log("FILES: move fonts:".blue, "Complete".green);

        callback();

    };
};

global.copy.adsDebug = function() {
    return function(callback) {
        console.log("FILES: move localAds for debug:".blue, "Start".red);

        fse.copySync('resources/assets/localAds.html', 'public/assets/localAds.html');
        fse.copySync('resources/assets/intruder.js', 'public/assets/intruder.js');

        console.log("FILES: move localAds for debug:".blue, "Complete".green);

        callback();

    };
};

global.copy.svg = function() {
    return function(callback) {
        console.log("FILES: move svgs:".blue, "Start".red);

        fse.copySync('resources/assets/svg/', 'public/assets/');

        console.log("FILES: move svgs:".blue, "Complete".green);
        callback();
    };
};

global.copy.images = function() {
    return function(callback) {
        console.log("FILES: move images:".blue, "Start".red);

        fse.copySync('resources/assets/img', 'public/assets/img');

        console.log("FILES: move images:".blue, "Complete".green);

        callback();
    };
};