js-isInViewport
=======

AMD Module to observe items (DOM Elements) the current viewport


# Basic usage

```js
	
	var _viewport = new isInViewportPlugin({
	
			// jQuery selector 
		selector    : '.bJS_isInViewport'

			// viewport threshold
		, threshold : 0
		
			// scroll and resize timeout
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
```

# Update: search new appended items

```js
    _viewport.searchNewItems();
```