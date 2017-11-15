"use strict";


function sanitizeProperty(property) {
	return property.replace(/\~1/g, "/").replace(/~0/g, "~");
}


function sanitizeAndDecodeProperty(property) {
	return sanitizeProperty(decodeURIComponent(property));
}


function split(pointer) {
	if (pointer == null || typeof pointer !== "string") {
		return [];
	}
	const sanitize = pointer.indexOf("#") >= 0 ? sanitizeAndDecodeProperty : sanitizeProperty;
	pointer = pointer.replace(/\/+/g, "/"); // remove multiple slashes
	pointer = pointer.replace(/(^[#/]*|\/+$)/g, ""); // strip pointer prefixes

	var result = pointer.split("/");
	for (var i = 0, l = result.length; i < l; i += 1) {
		result[i] = sanitize(result[i]);
	}
	return result;
}


module.exports = split;