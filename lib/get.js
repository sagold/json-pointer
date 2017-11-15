"use strict";

var split = require("./split");


function get(data, pointer) {
	if (pointer == null || data == null) {
		return;
	}
	if (pointer === "" || pointer === "#") {
		return data;
	}
	return run(data, split(pointer));
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
module.exports.run = run;
