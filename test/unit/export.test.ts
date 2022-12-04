import "mocha";
import { strict as assert } from "assert";
import gp, { get, set, remove, split, join, isRoot } from "../../index";
import dist from "../../dist/jsonPointer";
// import { get as getD, set as setD, remove as removeD } from "../../dist/gsonPointer.esm";

describe("export", () => {
	it("should export get", () => assert.equal(get({ a: 12 }, "#/a"), 12));
	it("should export set", () =>
		assert.deepEqual(set({}, "#/a", 12), { a: 12 }));
	it("should export remove", () =>
		assert.deepEqual(remove({ a: 12 }, "#/a"), {}));
	it("should export split", () =>
		assert.deepEqual(split("#/1/2"), ["1", "2"]));
	it("should export join", () => assert.deepEqual(join(["1", "2"]), "/1/2"));
	it("should export isRoot", () => assert.deepEqual(isRoot("#"), true));

	describe("default", () => {
		it("should export get", () =>
			assert.equal(gp.get({ a: 12 }, "#/a"), 12));
		it("should export set", () =>
			assert.deepEqual(gp.set({}, "#/a", 12), { a: 12 }));
		it("should export remove", () =>
			assert.deepEqual(gp.remove({ a: 12 }, "#/a"), {}));
		it("should export split", () =>
			assert.deepEqual(gp.split("#/1/2"), ["1", "2"]));
		it("should export join", () =>
			assert.deepEqual(gp.join(["1", "2"]), "/1/2"));
		it("should export isRoot", () =>
			assert.deepEqual(gp.isRoot("#"), true));
	});

	describe("dist", () => {
		it("should export get", () =>
			assert.equal(dist.get({ a: 12 }, "#/a"), 12));
		it("should export set", () =>
			assert.deepEqual(dist.set({}, "#/a", 12), { a: 12 }));
		it("should export remove", () =>
			assert.deepEqual(dist.remove({ a: 12 }, "#/a"), {}));
	});

	// describe("dist default", () => {
	// 	it("should export get", () => assert.equal(getD({ a: 12 }, "#/a"), 12))
	// 	it("should export set", () => assert.deepEqual(setD({}, "#/a", 12), { a: 12 }));
	// 	it("should export remove", () => assert.deepEqual(removeD({ a: 12 }, "#/a"), {}));
	// });
});
