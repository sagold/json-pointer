"use strict";


var expect = require("chai").expect;
var pointer = require("../../lib");


describe("pointer.get", function () {

	it("should return input value", function () {
		var result = pointer.get({property: "propertyValue"}, "#");

		expect(result).to.deep.eq({property: "propertyValue"})
	});

	it("should return input value for empty string", function () {
		var result = pointer.get({property: "propertyValue"}, "");

		expect(result).to.deep.eq({property: "propertyValue"})
	});

	it("should return property", function () {
		var result = pointer.get({property: "propertyValue"}, "/property");

		expect(result).to.eq("propertyValue")
	});

	it("should return undefined if property does not exist", function () {
		var result = pointer.get({property: "propertyValue"}, "/value");

		expect(result).to.be.undefined;
	});

	it("should return undefined if pointer is empty", function () {
		var result = pointer.get({property: "propertyValue"}, null);

		expect(result).to.be.undefined;
	});

	it("should ignore leading #", function () {
		var result = pointer.get({property: "propertyValue"}, "#/property");

		expect(result).to.eq("propertyValue")
	});

	it("should return value if falsy", function () {
		var result = pointer.get({property: 0}, "/property");

		expect(result).to.be.eq(0);
	});

	it("should return nested properties", function () {
		var result = pointer.get({property: {value: "propertyValue"}}, "#/property/value");

		expect(result).to.eq("propertyValue")
	});

	it("should return 'undefined' if nested property does not exist", function () {
		var result = pointer.get({property: {value: "propertyValue"}}, "#/property/missing/value");

		expect(result).to.be.undefined;
	});

	it("should resolve arrays", function () {
		var result = pointer.get(["0", {value: "propertyValue"}], "#/1/value");

		expect(result).to.eq("propertyValue")
	});
});