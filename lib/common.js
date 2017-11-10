"use strict";

// handle escaping of "/"
function sanitizeProperty(property) {
	if (property && property.replace) {
		return property.replace(/\~1/g, "/").replace(/~0/g, "~");
	}
	return property;
}

function toArray(pointer) {
	pointer = pointer || "";
	var list = stripPointerPrefix(pointer).split("/").map(sanitizeProperty);
	return list.filter(function (item) { return item !== "" });
}

/**
 * Removes root prefix of pointer
 *
 * @param  {String} pointer
 * @return {String} simple pointer path
 */
function stripPointerPrefix(pointer) {
	pointer = pointer.toString();
	// pointer = pointer.replace(/~0/, "~");
	// console.log("clean pointer", pointer.replace(/[#/]*/, ""));
	return pointer.replace(/[#/]*/, "");
}

var toParent = /^(.*)\/[^\/]+$/;
function getParentPointer(pointer) {
	var matches = pointer.match(toParent);
	if (matches) {
		return matches.pop();
	}
	return null;
}

var lastProperty = /^.*\/([^\/]+)$/;
function getLastProperty(pointer) {
	var matches = pointer.match(lastProperty);
	if (matches) {
		return matches.pop();
	}
	return pointer;
}


exports.stripPointerPrefix = stripPointerPrefix;
exports.getParentPointer = getParentPointer;
exports.getLastProperty = getLastProperty;
exports.sanitizeProperty = sanitizeProperty;
exports.toArray = toArray;
