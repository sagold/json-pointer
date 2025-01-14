import { split } from "./split";
import { JsonPointer, JsonPath, JsonData } from "./types";

const isArray = /^\[.*\]$/;
const findProperty = /^[[{](.+)[\]}]$/;

function accessToPrototype(key: string, properties: string[]) {
	return (
		key === "__proto__" ||
		(key == "constructor" &&
			properties.length > 0 &&
			properties[0] == "prototype")
	);
}

export function set<T = JsonData>(
	data: T,
	pointer: JsonPointer | JsonPath,
	value: any
): T {
	if (pointer == null) {
		return data;
	}

	const properties = split(pointer);
	if (properties.length === 0) {
		return data;
	}

	if (data == null) {
		data = (isArray.test(properties[0]) ? [] : {}) as T;
	}

	let key,
		nextKeyIsArray,
		current = data;
	while (properties.length > 1) {
		key = properties.shift();
		nextKeyIsArray = isArray.test(properties[0]) || `${parseInt(properties[0])}` === properties[0];
		if (accessToPrototype(key, properties)) {
			continue;
		}
		current = create(current, key, nextKeyIsArray);
	}
	key = properties.pop();
	addValue(current, key, value);
	return data;
}

function addValue(data, key, value) {
	const property = key.match(findProperty)?.pop() ?? key;
	if (key === "[]" && Array.isArray(data)) {
		data.push(value);
	} else {
		data[property] = value;
	}
}

function create(data, key, isArray) {
	const property = key.match(findProperty)?.pop() ?? key;
	if (data[property] != null) {
		return data[property];
	}
	const value = isArray ? [] : {};
	addValue(data, key, value);
	return value;
}
