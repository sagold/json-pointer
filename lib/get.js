"use strict";


var common = require("./common");


function get(data, pointer) {
	if (pointer == null || data == null) {
		return;
	}

	if (pointer === "" || pointer === "#") {
		return data;
	}

	var path = common.stripPointerPrefix(pointer).split("/").map(common.sanitizeProperty)
	return _get(data, path);
}


function _get(data, path) {
	var property = path.shift();
	if (data === undefined) {
		return;
	} else if (property !== undefined) {
		return _get(data[property], path);
	} else {
		return data;
	}
}


module.exports = get;
