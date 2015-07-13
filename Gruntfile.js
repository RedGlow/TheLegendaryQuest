module.exports = function(grunt) {
	require('load-grunt-tasks')(grunt);

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
				mangle: false
			},
			dist: {
				files: {
					'app.min.js': [
						'jquery-2.1.4.min.js',
						'angular.min.js',
						'gw2api.js',
						'price-directive.js',
						'now.js',
						'script.js',
						'bootstrap/js/bootstrap.js'
					]
				}
			}
		},
		cssmin: {
			dist: {
				files: {
					'app.min.css': [
						'bootstrap/css/bootstrap.css',
						'bootstrap/css/bootstrap.theme.css',
						'style.css',
					]
				}
			}
		},
		replace: {
			dist: {
				src: 'app.min.css',
				dest: 'app.min.css',
				replacements: [{
					from: '../fonts/',
					to: 'fonts/'
				}]
			}
		},
		processhtml: {
			dist: {
				files: {
					'index.html': 'origin-index.html'
				}
			}
		},
		copy: {
			dist: {
				files: [
					{
						expand: true,
						cwd: 'bootstrap/fonts',
						src: ['*'],
						dest: 'fonts'
					}
				]
			}
		}
	});

	// Load the plugin that provides the "uglify" task.
	grunt.loadNpmTasks('grunt-contrib-uglify');

	// Default task(s).
	grunt.registerTask('default', [
		'uglify',
		'cssmin',
		'replace',
		'copy',
		'processhtml'
	]);

};