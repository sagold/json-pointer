"use strict";


function removeUndefinedItems(array) {
	var i = 0;
	var skip = 0;
	while ((i + skip) < array.length) {
		if (array[i + skip] === undefined) {
			skip += 1;
		}
		array[i] = array[i + skip];
		i += 1;
	}
	array.length = array.length - skip;
	return array;
}


module.exports = removeUndefinedItems;
