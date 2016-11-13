"use strict";


var expect = require("chai").expect;
var pointer = require("../../lib");


describe("pointer.delete", function () {

	it("should delete the given property", function () {
		var result = pointer.delete({property: "propertyValue"}, "#/property");

		expect(result.property).to.be.undefined;
	});

	it("should work without starting #", function () {
		var result = pointer.delete({a: {b: {}, c: {}}}, "/a");

		expect(result.a).to.be.undefined;
	});

	it("should work for simple property", function () {
		var result = pointer.delete({a: {b: {}, c: {}}}, "a");

		expect(result.a).to.be.undefined;
	});

	it("should return input for empty pointer", function () {
		var data = {a: {b: {}, c: {}}};
		var result = pointer.delete(JSON.parse(JSON.stringify(data)), "");

		expect(result).deep.equal(data);
	});

	it("should delete nested property only", function () {
		var result = pointer.delete({a: {b: {}, c: {}}}, "#/a/b");

		expect(result.a.b).to.be.undefined;
		expect(result.a.c).to.be.instanceOf(Object);
	});

	describe("array", function () {

		it("should delete item in array", function () {
			var result = pointer.delete({ array: [0, 1, 2] }, "#/array/0");

			expect(result.array).to.have.length(2);
		});
	});
});