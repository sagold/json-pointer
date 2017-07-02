"use strict";


var expect = require("chai").expect;
var pointer = require("../../lib");


describe("pointer.toArray", function () {

	it("should return array no input", function () {
		var result = pointer.toArray();

		expect(result).to.be.an("array");
		expect(result.length).to.eq(0);
	});

	it("should return path properties in array", function () {
		var result = pointer.toArray("#/my/path");

		expect(result).to.be.an("array");
		expect(result).to.deep.eq(["my", "path"]);
	});

	it("should ignore trailing slash", function () {
		var result = pointer.toArray("#/my/path/");

		expect(result).to.be.an("array");
		expect(result).to.deep.eq(["my", "path"]);
	});

	it("should ignore empty properties", function () {
		var result = pointer.toArray("#/my//path");

		expect(result).to.be.an("array");
		expect(result).to.deep.eq(["my", "path"]);
	});

	it("should return same result without pointer prefix", function () {
		var result = pointer.toArray("my/path");

		expect(result).to.be.an("array");
		expect(result).to.deep.eq(["my", "path"]);
	});
});