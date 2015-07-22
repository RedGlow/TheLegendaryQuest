module.exports = function(grunt) {
	require('load-grunt-tasks')(grunt);

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		customizeBootstrap: {
			build: {
				options: {
					bootstrapPath: 'node_modules/bootstrap',
					local: 'manifest.less',
					dest: 'build'
				}
			}
		},
		less: {
			build: {
				files: {
					'build/bootstrap.css': 'build/bootstrap.less'
				}
			}
		},
		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
				mangle: false
			},
			dist: {
				files: {
					'app.min.js': [
						'node_modules/jquery/dist/jquery.min.js',
						'node_modules/angular/angular.min.js',
						'gw2api.js',
						'price-directive.js',
						'now.js',
						'script.js'
					]
				}
			}
		},
		cssmin: {
			dist: {
				files: {
					'app.min.css': [
						'build/bootstrap.css',
						'style.css',
					]
				}
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
			fonts: {
				files: [
					{
						expand: true,
						cwd: 'node_modules/bootstrap/fonts',
						src: ['*'],
						dest: 'build/fonts'
					}
				]
			},
			dist: {
				files: [
					{
						expand: true,
						cwd: 'node_modules/bootstrap/fonts',
						src: ['*'],
						dest: 'fonts'
					}
				]
			}
		}
	});

	// Default task(s).
	grunt.registerTask('develop', [
		'customizeBootstrap',
		'copy:fonts',
		'less'
	]);
	
	grunt.registerTask('default', [
		'develop',
		'uglify',
		'cssmin',
		'copy:dist',
		'processhtml'
	]);

};