module.exports = function(grunt) {

		// Project configuration.
	grunt.initConfig({

			// Metadata.
		pkg : grunt.file.readJSON('package.json')
			// global config
		, globalConfig: {
			jsDir       : 'Resources/Public/Scripts/'
			, stylesDir : 'Resources/Public/Styles/'
		}
		, banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
			'<%= grunt.template.today("yyyy-mm-dd") %>\n' +
			'<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
			'* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
			' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',

			// Task configuration.
		clean    : {
			js  : ['demo/js/dist/main.js']
		}

		, concat : {
			options: {
				banner      : '<%= banner %>',
				stripBanners: true
			}
			, dist   : {
				src : ['bower_components/requirejs/require.js', 'demo/js/dist/main.js' ],
				dest: 'demo/js/dist/main.js'
			}
		}

		, uglify: {
			options: {
				banner: '<%= banner %>'
			},
			dist   : {
				src : 'demo/js/dist/main.js',
				dest: '<%= globalConfig.jsDir %>app/dist/main.min.js'
			}
		}
			// watch tasks
		, watch: {
			less: {
				files     : ['Resources/Public/Styles/less/**/*.less']
				, tasks   : ['clean:css', 'less:development']
				, options : {
					spawn : false
				}
			}
			, less1: {
				files     : ['Resources/Public/Styles/less/**/*.less']
				, tasks   : ['clean:css', 'less:less1']
				, options : {
					spawn : false
				}
			}
			, less2: {
				files     : ['Resources/Public/Styles/less/**/*.less']
				, tasks   : ['clean:css', 'less:less1']
				, options : {
					spawn : false
				}
			}
		}

			// add bower components to requirejs config file
		, bower: {
			target: {
				rjsConfig: 'demo/js/config.js'
			}
		}

			// do r.js build
		, requirejs: {
			compile: {
				options: {
					name          : 'config'
					, mainConfigFile: 'demo/js/config.js'
					, out           : 'demo/js/dist/main.js'
					, optimize      : 'none'
					, findNestedDependencies: true
				}
			}
		}
	});

		// These plugins provide necessary tasks.
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-requirejs');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-bower-requirejs');


	/**
	 * ----------------
	 * GRUNT TASKS
	 * ----------------
	 */

		// js build
	grunt.registerTask('jsBuild', ['bower', 'clean:js', 'requirejs', 'concat']);
};
