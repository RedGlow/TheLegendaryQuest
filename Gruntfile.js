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
					'dist/app.min.js': [
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
					'dist/app.min.css': [
						'bootstrap/css/bootstrap.css',
						'bootstrap/css/bootstrap.theme.css',
						'style.css',
					]
				}
			}
		},
		replace: {
			dist: {
				src: 'dist/app.min.css',
				dest: 'dist/app.min.css',
				replacements: [{
					from: '../fonts/',
					to: 'fonts/'
				}]
			}
		},
		processhtml: {
			dist: {
				files: {
					'dist/index.html': 'index.html'
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
						dest: 'dist/fonts'
					},
					{
						expand: true,
						cwd: 'img',
						src: ['*'],
						dest: 'dist/img'
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