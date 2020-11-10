import { JSONPointer, JSONPath } from "./types";
/**
 * From a json-pointer, creates an array of properties, describing a path into
 * json-data
 */
export default function split(pointer: JSONPointer | JSONPath): JSONPath;
