import { JSONPointer, JSONPath, JSONData } from "./types";
/**
 * Fetch value at given json-pointer. Returns undefined, if no value can be
 * found at json-pointer
 */
export default function get<T = any>(data: JSONData, pointer: JSONPointer | JSONPath, defaultValue?: T): T | undefined;
