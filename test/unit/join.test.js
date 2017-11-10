"use strict";


const expect = require("chai").expect;
const pointer = require("../../lib");
const join = pointer.join;


describe("pointer.join()", () => {

	it("should return a json pointer", () => {
		const pointer = join();

		expect(pointer).to.eq("#");
	});

	it("should join multiple pointers", () => {
		const pointer = join("#/parent", "#/child", "#/target");

		expect(pointer).to.eq("#/parent/child/target");
	});

	it("should join single words to a pointer", () => {
		const pointer = join("parent", "child", "target");

		expect(pointer).to.eq("#/parent/child/target");
	});

	it("should not have multiple slashes", () => {
		const pointer = join("#", "", "first");

		expect(pointer).to.eq("#/first");
	});

	it("should resolve relative pointers", () => {
		const pointer = join("#/first/second/third", "../../2");

		expect(pointer).to.eq("#/first/2");
	});

	it("should return parent pointer", () => {
		const pointer = join("#/first/second/third", "..");

		expect(pointer).to.eq("#/first/second");
	});

	it("should return root pointer", () => {
		const pointer = join("#/first", "..");

		expect(pointer).to.eq("#");
	});

	it("should return always return root", () => {
		const pointer = join("#", "..");

		expect(pointer).to.eq("#");
	});
});
