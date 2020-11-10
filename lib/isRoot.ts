import { JSONPointer, JSONPath } from "./types";

export default function isRoot(pointer: JSONPointer|JSONPath): boolean {
	return pointer === "#" || pointer === "" || (Array.isArray(pointer) && pointer.length === 0) || false;
}
