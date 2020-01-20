# taskmodules

## NOT MAINTAINED
**I recommend you to use something else, like Webpack or next.js**  
https://webpack.js.org/  
https://nextjs.org/  

Modular gulp or grunt tasks wrapped in a npm module because I wanted more flexibility when setting up the order of when tasks are called. What tasks need to be in series and what tasks can run parallel.

## Install
`npm install taskmodules`

## Usage
Since all modules are selfcontained you can pick those you need. You can combine gulp and grunt or your own node.js modules.

In your gulp/grunt file import taskmodules  
`var taskmodules = require('taskmodules');`

## Asyns setup
Taskmodules are great to use in a library like async.
You can easily choose when tasks need to run in series of parallell.

	gulp.task('default', function(done) {

    	async.series([
        	taskmodules.utils.svgIconFont.create('assets/icons/', '_icon-font', 'src/scss/iconfont/', '_icon-font.scss', true, false),
	        taskmodules.js.browserify.create('src/js/main.js', 'main.js', 'dist/js/', false, false),
    	    taskmodules.style.sass.create('src/scss/main.scss', 'main.scss', 'dist/css/', false, false)
	    ], function() {
    	    console.log("SERIES COMPLETE");

        	async.parallel([
            	taskmodules.utils.svgIconFont.create('assets/icons/', '_icon-font', 'src/scss/iconfont/', '_icon-font.scss', true, false),
	            taskmodules.js.browserify.create('src/js/main.js', 'main.js', 'dist/js/', false, false),
    	        taskmodules.style.sass.create('src/scss/main.scss', 'main.scss', 'dist/css/', false, false)
        	], function() {
            	console.log("PARALLEL COMPLETE");
	            done();
    	    });
	    });
	});


## js.browserify

Setup for use of browserify, my most common setup for js.

####Parameters
**sourceFile** the main js file  
**outputFile** name of the output file  
**outputPath** path for the output  
**isAsync** if the task is async, if true it will report itself as complete directly after execution.  
**production** production flag, if true it will do stuff like minify and so on.

####Example

`taskmodules.js.browserify.create('src/js/main.js', 'main.js', 'dist/js/', false, false)`

## style.sass

A basic task for our sass setup, will output soucemaps and minify css in normal mode. Excludes sourcemaps for production.

`taskmodules.style.sass.create('src/scss/main.scss', 'main.scss', 'dist/css/', false, false)`

## utils.svgIconFont

Creates iconfont from a folder of svg files.
Outputs a .scss file that can be used in the sass setup.

`taskmodules.utils.svgIconFont.create('assets/icons/', '_icon-font', 'src/scss/iconfont/', '_icon-font.scss', true, false)`

