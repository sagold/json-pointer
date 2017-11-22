"use strict";

var isRoot = require("./isRoot");

var matchSlashes = /~1/g;
var matchTildes = /~0/g;
var matchMutlipleSlashes = /\/+/g;
var matchPointerPrefixes = /(^[#/]*|\/+$)/g;


function sanitizeProperty(property) {
	return property.replace(matchSlashes, "/").replace(matchTildes, "~");
}


function sanitizeAndDecodeProperty(property) {
	return sanitizeProperty(decodeURIComponent(property));
}


function split(pointer) {
	if (pointer == null || typeof pointer !== "string" || isRoot(pointer)) {
		return Array.isArray(pointer) ? pointer : [];
	}
	const sanitize = pointer.indexOf("#") >= 0 ? sanitizeAndDecodeProperty : sanitizeProperty;
	pointer = pointer.replace(matchMutlipleSlashes, "/");
	pointer = pointer.replace(matchPointerPrefixes, "");

	var result = pointer.split("/");
	for (var i = 0, l = result.length; i < l; i += 1) {
		result[i] = sanitize(result[i]);
	}
	return result;
}


module.exports = split;