"use strict";


var common = require("./common");
var isArray = /^\[.*\]$/;
var arrayIndex = /^\[(.+)\]$/;


function set(data, pointer, value) {
	if (pointer == null || data == null) {
		return null;
	}
	var key, nextKeyIsArray, current = data || {};
	var properties = common.stripPointerPrefix(pointer).split("/");
	while (properties.length > 1) {
		key = properties.shift();
		nextKeyIsArray = isArray.test(properties[0]);
		current = create(current, key, nextKeyIsArray);
	}
	key = properties.pop();
	addValue(current, key, value);
	return data;
}


function addValue(data, key, value) {
	var index;
	var keyAsIndex = key.match(arrayIndex);
	if (key === "[]" && Array.isArray(data)) {
		data.push(value);
	} else if (keyAsIndex) {
		index = keyAsIndex.pop();
		data[index] = value;
	} else {
		data[key] = value;
	}
}


function create(data, key, isArray) {
	if (data[key] != null) {
		return data[key];
	}
	var value = isArray ? [] : {};
	addValue(data, key, value);
	return value;
}


module.exports = set;
