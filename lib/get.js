"use strict";


var common = require("./common");


function get(data, pointer) {
	if (pointer == null || data == null) {
		return;
	}

	var path = common.stripPointerPrefix(pointer).split("/");
	return _get(data, path);
}


function _get(data, path) {
	var property = path.shift();
	if (data === undefined) {
		return;
	} else if (property) {
		return _get(data[property], path);
	} else {
		return data;
	}
}


module.exports = get;
