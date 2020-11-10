import split from "./split";
import isRoot from "./isRoot";
import { JSONPointer, JSONPath, JSONData } from "./types";


/**
 * Fetch value at given json-pointer. Returns undefined, if no value can be
 * found at json-pointer
 */
export default function get<T = any>(data: JSONData, pointer: JSONPointer|JSONPath, defaultValue?: T): T|undefined {
	if (pointer == null || data == null) {
		return defaultValue;
	}
	if (isRoot(pointer)) {
		return data;
	}
	const result = run(data, split(pointer));
	if (result === undefined) {
		return defaultValue;
	}
	return result;
}


function run<T = any>(data: JSONData, path: JSONPath): T|undefined {
	const property = path.shift();
	if (data === undefined) {
		return;
	} else if (property !== undefined) {
		return run(data[property], path);
	}
	return data;
}
