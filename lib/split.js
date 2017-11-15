var sanitize = require("./sanitize");
var sanitizeAndDecodeProperty = sanitize.andDecodeProperty;
var sanitizeProperty = sanitize.property;
var sanitizePointer = sanitize.pointer;


function split(pointer) {
	if (pointer == null || typeof pointer !== "string") {
		return [];
	}
	const sanitize = pointer.indexOf("#") >= 0 ? sanitizeAndDecodeProperty : sanitizeProperty;
	return sanitizePointer(pointer).split("/").map(sanitize);
}


module.exports = split;