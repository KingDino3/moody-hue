/***
** Pulled from jQuery v1.11.1
***/

var _ = require("underscore");

var extend = function() {
	var src, copyIsArray, copy, name, options, clone,
		target = arguments[0] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !_.isFunction(target) ) {
		target = {};
	}

	// extend jQuery itself if only one argument is passed
	// if ( i === length ) {
	// 	target = this;
	// 	i--;
	// }

	for ( ; i < length; i++ ) {
		// Only deal with non-null/undefined values
		if ( (options = arguments[ i ]) != null ) {
			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( isPlainObject(copy) || (copyIsArray = _.isArray(copy)) ) ) {
					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && _.isArray(src) ? src : [];

					} else {
						clone = src && isPlainObject(src) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};


var isPlainObject = function(obj){
	// Must be an Object.
    // Because of IE, we also have to check the presence of the constructor property.
    // Make sure that DOM nodes and window objects don't pass through, as well
    if ( !obj || toString.call(obj) !== "[object Object]" || obj.nodeType || 
	 obj.setInterval ) {
	return false;
    }
    
    // Not own constructor property must be Object
    if ( obj.constructor
	 && !hasOwnProperty.call(obj, "constructor")
	 && !hasOwnProperty.call(obj.constructor.prototype, "isPrototypeOf") ) {
	return false;
    }
    
    // Own properties are enumerated firstly, so to speed up,
    // if last one is own, then all properties are own.
    
    var key;
    for ( key in obj ) {}
    
    return key === undefined || hasOwnProperty.call( obj, key );
};

module.exports = extend;