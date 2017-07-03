"use strict";


var stripPointerPrefix = require("./common").stripPointerPrefix;

function filterNotEmpty(value) {
	return (value == null || value === "") === false;
}

function cleanupPointer(pointer) {
	return stripPointerPrefix(pointer);
}

function splitPointer(pointer) {
	return pointer.split("/");
}

function flattenArray(list, result) {
	result = result || [];
    for (let i = 0; i < list.length; i += 1) {
        if (Array.isArray(list[i])) {
            flattenArray(list[i], result);
        } else {
            result.push(list[i]);
        }
    }
    return result;
}

function resolveRelatives(frags, pointer) {
	pointer === ".." ? frags.pop() : frags.push(pointer);
	return frags;
}

function join() {
	var args = Array.prototype.slice.call(arguments, 0);
	var pointer = args
		.map(cleanupPointer)
		.filter(filterNotEmpty)
		.map(splitPointer)

	var result = flattenArray(pointer)
		.reduce(resolveRelatives, []);

	result.unshift("#");
	result = result.join("/");
	return result.replace(/\/+/g, "/");
}


module.exports = join;
