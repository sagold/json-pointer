"use strict";


var stripPointerPrefix = require("./common").stripPointerPrefix;


function join() {
	var pointer = Array.prototype.map.call(arguments, function (pointer) {
		return stripPointerPrefix(pointer);
	});
	pointer = "#/" + pointer.join("/");
	return pointer.replace(/\/+/g, "/");
}


module.exports = join;
