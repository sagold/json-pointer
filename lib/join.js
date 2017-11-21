"use strict";


var split = require("./split");
var toString = Object.prototype.toString;
var simpleJoin = Array.prototype.join;
var matchMutlipleSlashes = /\/+/g;
var matchTildes = /~/g;
var matchSlashes = /\//g;


function joinList(list, isURI) {
	if (list.length === 0) {
		return isURI ? "#" : "";
	}

	var pointer = list.join("/");
	for (var i = 0, l = list.length; i < l; i += 1) {
		list[i] = list[i].replace(matchTildes, "~0").replace(matchSlashes, "~1");
		if (isURI) {
			list[i] = encodeURIComponent(list[i]);
		}
	}

	var pointer = (isURI ? "#/" : "/") + list.join("/");
	return pointer.replace(matchMutlipleSlashes, "/");
}


function join(firstPointer) {
	var result = [];
	if (Array.isArray(firstPointer)) {
		return joinList(firstPointer, arguments[1] === true);
	}

	// determine type of pointer
	var option = arguments[arguments.length - 1];
	var isURI = (typeof option === "boolean") ? option : (firstPointer && firstPointer[0] === "#");

	for (var i = 0, l = arguments.length; i < l; i += 1) {
		result.push.apply(result, split(arguments[i]));
	}

	// build final list of properties
	var pointer = [];
	for (var i = 0, l = result.length; i < l; i += 1) {
		if (result[i] === "..") {
			if (pointer.length === 0) {
				return isURI ? "#" : "";
			}
			pointer.pop();
		} else {
			pointer.push(result[i]);
		}
	}

	return joinList(pointer, isURI);
}


module.exports = join;
