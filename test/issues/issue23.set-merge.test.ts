/* eslint no-unused-expressions: 0 */
import "mocha";
import { strict as assert } from "assert";
import { set } from "../../lib/set";

describe("pointer.set", () => {
	it("should merge properties in array items", () => {
		const obj: Record<string, any> = {};

		set(obj, '/list/[0]/itemA', 1)
		set(obj, '/list/[0]/itemB', 1)

		assert.deepEqual(obj.list, [{ itemA: 1, itemB: 1 }]);
	});

	it("should merge properties in array items using number as index", () => {
		const obj: Record<string, any> = {};

		set(obj, '/list/0/itemA', 1)
		set(obj, '/list/0/itemB', 1)

		assert.deepEqual(obj.list, [{ itemA: 1, itemB: 1 }]);
	});

	it("should prefer existing data-type array over specified data-type in pointer", () => {
		const obj: Record<string, any> = {
			list: []
		};

		set(obj, '/list/{0}/itemA', 1)
		set(obj, '/list/{0}/itemB', 1)

		assert.deepEqual(obj.list, [{ itemA: 1, itemB: 1 }]);
	});

	it("should prefer existing data-type object over specified data-type in pointer", () => {
		const obj: Record<string, any> = {
			list: {}
		};

		set(obj, '/list/[0]/itemA', 1)
		set(obj, '/list/[0]/itemB', 1)

		assert.deepEqual(obj.list, { 0: { itemA: 1, itemB: 1 } });
	});
});