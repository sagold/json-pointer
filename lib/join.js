"use strict";


var split = require("./split");
var toString = Object.prototype.toString;
var slice = Array.prototype.slice;


function filterNotEmpty(value) {
	return (value == null || value === "") === false;
}

function flattenArray(list, result) {
	result = result || [];
    for (var i = 0; i < list.length; i += 1) {
        if (toString.call(list[i]) === "[object Array]") {
            flattenArray(list[i], result);
        } else {
            result.push(list[i]);
        }
    }
    return result;
}

function listToPointer(list, isURI) {
	var pointer = list.join("/");
	for (var i = 0, l = list.length; i < l; i += 1) {
		list[i] = list[i].replace("~", "~0").replace("/", "~1");
		if (isURI) {
			list[i] = encodeURIComponent(list[i]);
		}
	}

	var pointer = (isURI ? "#/" : "/") + list.join("/");
	return pointer.replace(/\/+/g, "/");
}


function join() {
	var args = slice.call(arguments, 0);
	if (args.length === 0) {
		return "";
	}

	var isURI = args[0].indexOf("#") >= 0;
	var pointer = args.filter(filterNotEmpty).map(split);

	args.length = 0; // reuse args
	var result = flattenArray(pointer, args);

	// build final list of properties
	pointer.length = 0; // reuse pointer
	for (var i = 0, l = result.length; i < l; i += 1) {
		if (result[i] === "..") {
			if (pointer.length === 0) {
				break;
			}
			pointer.pop();
		} else {
			pointer.push(result[i]);
		}
	}

	if (pointer.length === 0) {
		return isURI ? "#" : "";
	}

	return listToPointer(pointer, isURI);
}


module.exports = join;
