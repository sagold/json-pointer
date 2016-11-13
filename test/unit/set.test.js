"use strict";


var expect = require("chai").expect;
var pointer = require("../../lib");


describe("pointer.set", function () {

	it("should add value to the given property", function () {
		var result = pointer.set({}, "#/property", true);

		expect(result).to.have.property("property");
		expect(result.property).to.be.true;
	});

	it("should add value on the given path", function () {
		var result = pointer.set({}, "#/path/to/property", true);

		expect(result.path.to.property).to.be.true
	});

	it("should not remove any other properties", function () {
		var result = pointer.set({
			"path": { "to": { "id": "parent"} }
		}, "#/path/to/property", true);

		expect(result.path.to.property).to.be.true
		expect(result.path.to.id).to.eq("parent");
	});

	it("should insert array for []", function () {
		var result = pointer.set({}, "#/array/[]", true);

		expect(result.array).to.be.an.array;
		expect(result.array.length).to.eq(1);
	});

	it("should insert index in array", function () {
		var result = pointer.set({}, "#/array/[1]", true);

		expect(result.array).to.be.an.array;
		expect(result.array.length).to.eq(2);
		expect(result.array[1]).to.be.true;
	});

	it("should insert array in array", function () {
		var result = pointer.set({}, "#/array/[]/[]", true);

		expect(result.array[0]).to.be.an.array;
		expect(result.array[0][0]).to.be.true;
	});

	it("should insert array to index in array", function () {
		var result = pointer.set({}, "#/array/[1]/[]", true);

		expect(result.array[1]).to.be.an.array;
		expect(result.array[1][0]).to.be.true;
	});

	it("should insert object in array", function () {
		var result = pointer.set({}, "#/array/[1]/valid", true);

		expect(result.array.length).to.eq(2);
		expect(result.array[1]).to.be.an.object;
		expect(result.array[1].valid).to.be.true;
	});
});
