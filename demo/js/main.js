var B  = B || {};

require([
	'jquery',
	'isInViewport'
], function($, isInViewportPlugin){

		/**
		 * init
		 */
	function initialize() {
		B.viewport = new initIsInViewport();
	}


		/**
		 * init is in viewport plugin
		 */
	function initIsInViewport() {

		var viewport = new isInViewportPlugin({
			selector    : '.bJS_isInViewport'
			, threshold : 0
			, timeout   : 150
				// called after timeout
				// callback is fired after viewport changed (resize) and/or after change
			, afterChange : function(obj, collection) {
				console.log("after scroll");

				console.log(obj);
				console.log(collection);

				console.log(obj.getAllVisibleItemsInViewport());
			}
		});

		return viewport;
	}

		// on document ready
	$(function() {
		initialize();
	});
});