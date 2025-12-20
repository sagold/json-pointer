//#region lib/types.d.ts
type JsonPointer = string;
type JsonPath = string[];
type JsonData = unknown;
//#endregion
//#region lib/get.d.ts
/**
 * Fetch value at given json-pointer. Returns undefined, if no value can be
 * found at json-pointer
 *
 * @param data - json data to resolve json-pointer
 * @param pointer - json pointer to value
 * @param [defaultValue] - optional default value to return if json-pointer location does not exist
 * @return value at json-pointer, defaultValue if specified or undefined
 */
declare function get<T = unknown>(data: JsonData, pointer: JsonPointer | JsonPath, defaultValue: T): T;
declare function get<T = unknown>(data: JsonData, pointer: JsonPointer | JsonPath, defaultValue?: T): T | undefined;
//#endregion
//#region lib/set.d.ts
declare function set<T = JsonData>(data: T, pointer: JsonPointer | JsonPath, value: unknown): T;
//#endregion
//#region lib/remove.d.ts
/**
 * Deletes a value at specified json-pointer from data
 * Note: input data is modified
 *
 * @param data - input data
 * @param pointer - location of data to remove
 * @param [keepArrayIndices] - if set to `true`, will set array element to undefined (instead of removing it)
 */
declare function remove<T = unknown>(data: T, pointer: JsonPointer | JsonPath, keepArrayIndices?: boolean): T;
//#endregion
//#region lib/join.d.ts
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
declare function join(path: JsonPath, uriFragment?: boolean): JsonPointer;
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
declare function join(...pointer: (JsonPointer | boolean)[]): JsonPointer;
//#endregion
//#region lib/split.d.ts
/**
 * From a json-pointer, creates an array of properties, describing a path into
 * json-data
 */
declare function split(pointer: JsonPointer | JsonPath): JsonPath;
//#endregion
//#region lib/splitLast.d.ts
/**
 * splits the last property of json-pointer and returns the path and property.
 * @returns tuple with parent json-pointer and the last property or undefined if pointer a root pointer
 */
declare function splitLast(pointer: JsonPointer | JsonPath): [string, string | undefined];
//#endregion
//#region lib/isRoot.d.ts
/**
 * @returns true, if this pointer location is the root data
 */
declare function isRoot(pointer: JsonPointer | JsonPath): boolean;
//#endregion
//#region lib/removeUndefinedItems.d.ts
/**
 * Removes all `undefined` values within an array without creating additional
 * arrays
 */
declare function removeUndefinedItems<T = unknown>(array: T[]): T[];
//#endregion
//#region index.d.ts
declare const jsonPointer: {
  get: typeof get;
  set: typeof set;
  remove: typeof remove;
  join: typeof join;
  split: typeof split;
  splitLast: typeof splitLast;
  isRoot: typeof isRoot;
  removeUndefinedItems: typeof removeUndefinedItems;
};
//#endregion
export { type JsonData, type JsonPath, type JsonPointer, jsonPointer as default, get, isRoot, join, remove, removeUndefinedItems, set, split, splitLast };