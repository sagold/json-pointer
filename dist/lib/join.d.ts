import { JsonPointer, JsonPath } from "./types";
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
export declare function join(path: JsonPath, uriFragment?: boolean): JsonPointer;
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
export declare function join(...pointer: (JsonPointer | boolean)[]): JsonPointer;
