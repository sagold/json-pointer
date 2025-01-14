/* eslint no-unused-expressions: 0 */
import "mocha";
import { expect } from "chai";
import { set } from "../../lib/set";

describe("pointer.set", () => {
	it("should merge properties in array items", () => {
		const obj: Record<string, any> = {};

		set(obj, '/list/[0]/itemA', 1)
		set(obj, '/list/[0]/itemB', 1)

		expect(obj.list).to.deep.equal([{ itemA: 1, itemB: 1 }]);
	});
});