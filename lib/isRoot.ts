import { JsonPointer, JsonPath } from "./types";

export default function isRoot(pointer: JsonPointer | JsonPath): boolean {
	return (
		pointer === "#" ||
		pointer === "" ||
		(Array.isArray(pointer) && pointer.length === 0) ||
		false
	);
}
