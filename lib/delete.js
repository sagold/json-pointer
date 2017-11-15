"use strict";


var split = require("./split");
var get = require("./get");
var removeUndefinedItems = require("./removeUndefinedItems");


function pointerDelete(data, pointer, keepArrayIndices) {
	var properties = split(pointer);

	var lastProperty = properties.pop();
	var toParent = properties;
	var target = get.run(data, toParent);
	if (target) {
		delete target[lastProperty];
	}
	if (Array.isArray(target) && keepArrayIndices !== true) {
		removeUndefinedItems(target);
	}
	return data;
}


module.exports = pointerDelete;
