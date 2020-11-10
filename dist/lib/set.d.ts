import { JSONPointer, JSONPath, JSONData } from "./types";
export default function set<T = JSONData>(data: T, pointer: JSONPointer | JSONPath, value: any): T;
