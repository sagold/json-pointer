module.exports = function toArray(pointer) {
	pointer = pointer || "";
	const list = pointer.replace(/^[#\/]*/, "").replace(/\/*$/, "").split("/");
	return list.filter(function (item) { return item !== "" });
}