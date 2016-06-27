require.config({
	paths: {
		jquery: '../../bower_components/jquery/dist/jquery',
		requirejs: '../../bower_components/requirejs/require',
		isInViewport: '../../src/isInViewport'
	},
	shim: {

	},
	packages: [

	]
});

	// require main js
require(['main']);