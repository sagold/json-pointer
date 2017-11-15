"use strict";


function sanitizeProperty(property) {
	return property.replace(/\~1/g, "/").replace(/~0/g, "~");
}


function sanitizeAndDecodeProperty(property) {
	return sanitizeProperty(decodeURIComponent(property));
}


/**
 * @param  {String} pointer	- json-pointer
 * @return {String} sanitized version of the json-pointer
 */
function sanitizePointer(pointer) {
	// remove multiple slashes
	pointer = pointer.replace(/\/+/g, "/");
	// strip pointer prefixis
	pointer = pointer.replace(/(^[#/]*|\/+$)/g, "");
	return pointer;
}


module.exports = {
	property: sanitizeProperty,
	andDecodeProperty: sanitizeAndDecodeProperty,
	pointer: sanitizePointer
};
