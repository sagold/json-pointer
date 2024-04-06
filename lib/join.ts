import { split } from "./split";
import { JsonPointer, JsonPath } from "./types";

const matchTildes = /~/g;
const matchSlashes = /\//g;

function joinList(list: JsonPath, isURI: boolean) {
	if (list.length === 0) {
		return isURI ? "#" : "";
	}

	for (let i = 0, l = list.length; i < l; i += 1) {
		list[i] = list[i]
			.replace(matchTildes, "~0")
			.replace(matchSlashes, "~1");
		if (isURI) {
			list[i] = encodeURIComponent(list[i]);
		}
	}

	return (isURI ? "#/" : "/") + list.join("/");
}

/**
 * Convert an array of properties (json-path) to a valid json-pointer.
 * 
 * If the last parameter is a boolean and set to true, a URIFragment is
 * returned (leading `#/`)
 *
 * # examples
 *
 *	`join(["metadata", "title"])` // "metadata/title"
 * 
 *	`join(["metadata", "title"], true)` // "#/metadata/title"
 */
export function join(path: JsonPath, uriFragment?: boolean): JsonPointer;

/**
 * Convert a list of json-pointers to a valid json-pointer. Supports as input:
 * 
 * 	- a list of json-pointers
 * 	- relative json-pointers
 *
 * If the last parameter is a boolean and set to true, a URIFragment is
 * returned (leading `#/`)
 *
 * # examples
 *
 *	`join("metadata", "title")` // "metadata/title"
 * 
 *	`join("#/metadata", "title")` // "#/metadata/title"
 * 
 *	`join("metadata", "title", true)` // "#/metadata/title"
 * 
 *	`join("metadata", "../title")` // "title"
 */
export function join(...pointer: (JsonPointer | boolean)[]): JsonPointer;

// eslint-disable-next-line  @typescript-eslint/no-unused-vars
export function join(firstPointer, ...args: (JsonPointer | boolean)[]): JsonPointer {
	const result = [];
	if (Array.isArray(firstPointer)) {
		return joinList(firstPointer, arguments[1] === true); // eslint-disable-line
	}

	// determine type of pointer
	const option = arguments[arguments.length - 1]; // eslint-disable-line
	const isURI =
		typeof option === "boolean"
			? option
			: firstPointer && firstPointer[0] === "#";

	for (let i = 0, l = arguments.length; i < l; i += 1) {
		result.push.apply(result, split(arguments[i])); // eslint-disable-line
	}

	// build final list of properties
	const pointer = [];
	for (let i = 0, l = result.length; i < l; i += 1) {
		if (result[i] === "..") {
			if (pointer.length === 0) {
				return isURI ? "#" : "";
			}
			pointer.pop();
		} else {
			pointer.push(result[i]);
		}
	}

	return joinList(pointer, isURI);
}
