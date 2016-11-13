"use strict";


/**
 * Removes root prefix of pointer
 *
 * @param  {String} pointer
 * @return {String} simple pointer path
 */
function stripPointerPrefix(pointer) {
	pointer = pointer.toString();
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
