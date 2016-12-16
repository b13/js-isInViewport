
/**
 * is in viewport plugin
 *
 * observe the current viewport to check if items of a jquery collection
 * are visible inside the current viewport
 */

define([
	"jquery"
], function($) {

	return (function(options) {

		var
			me               = this
			, $items         = {}
			, itemCollection = []
			, windowHeight   = ''
			, timeout        = setTimeout(function(){},0)
				// default options
			, opts           = $.extend({
					// jQuery selector
				selector        : '.bJS_isInViewport'
					// viewport threshold
				, threshold     : 0
					// scroll and resize timeout
				, timeout : 150

					// called after timeout
					// callback is fired after viewport changed (resize) and/or after change
				, afterChange : function() {}

			}, options);



			/**
			 * initialize
			 *
			 * @returns {*}
			 */
		function initialize() {

				// on document ready
			$(function() {
					// get all items
				$items = $(opts.selector);
				updatePosition();
			});

				// on scroll
			$(document).on('scroll', function() {
				clearTimeout(timeout);
				timeout = setTimeout(observeViewport, opts.timeout);
			});

				// on resize
			$(window).on('resize', function() {
				clearTimeout(timeout);
				timeout = setTimeout(updatePosition, opts.timeout);
			});

				// on window load update positions
				// this is just called on first page load and not on history back
			$(window).on('load', function() {
				updatePosition();
			});

			return me;
		}


			/**
			 * observe viewport
			 *
			 * check if items from the collection are inside the current viewport
			 */
		function observeViewport() {
			var
				currentScrollTop     = $(this).scrollTop() - opts.threshold
				, viewportBottomLine = $(this).scrollTop() + windowHeight + opts.threshold;

			$.each(itemCollection, function(key, item) {
				if (item.bottomLine > currentScrollTop && item.offsetTop <= viewportBottomLine) {
						// item is visible in viewport
					item.isInViewport = true;
				} else {
						// item is NOT visible in viewport
					item.isInViewport = false;
				}
			});

				// fire after scroll callback
			opts.afterChange.call(this, me, itemCollection);
		}



			/**
			 * update position
			 *
			 * cache viewport and all item properties
			 * function is called on window resize and orientation change
			 */
		function updatePosition() {
			windowHeight   = $(window).height();
			itemCollection = [];

			$items.each(function() {
				var
					offsetTop = parseInt($(this).offset().top, 10)
					, height  = parseInt($(this).height(), 10);

					// item collection
				itemCollection.push({
					offsetTop      : offsetTop
					, height       : height
					, bottomLine   : offsetTop + height
					, isInViewport : false
					, $this        : $(this)
				});
			});

				// check for current items in viewport
			observeViewport();
		}


		/**
		 * ----------------------
		 * PUBLIC
		 * ----------------------
		 */


			/**
			 * get all visible items in viewport
			 * @returns {*} collection
			 */
		me.getAllVisibleItemsInViewport = function() {
			var visibleItems = [];
			$.each(itemCollection, function(key, item) {
				if (item.isInViewport) {
					visibleItems.push(item);
				}
			});
			return visibleItems;
		};


			/**
			 * update all positions
			 */
		me.update = function() {
			updatePosition();
		};


			/**
			 * search new items
			 */
		me.searchNewItems = function() {
			var $newItems = $(opts.selector).not($items);
			if ($newItems.length > 0) {
				$items = $(opts.selector);
				updatePosition();
			}
		};

		return initialize();
	});
});