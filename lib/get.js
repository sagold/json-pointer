"use strict";

var split = require("./split");
var isRoot = require("./isRoot");


function get(data, pointer, defaultValue) {
	if (pointer == null || data == null) {
		return defaultValue;
	}
	if (isRoot(pointer)) {
		return data;
	}
	const result = run(data, split(pointer));
	if (result === undefined) {
		return defaultValue;
	}
	return result;
}

function run(data, path) {
	var property = path.shift();
	if (data === undefined) {
		return;
	} else if (property !== undefined) {
		return run(data[property], path);
	}
	return data;
}


module.exports = get;
