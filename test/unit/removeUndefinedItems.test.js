"use strict";


var expect = require("chai").expect;
var remove = require("../../lib/removeUndefinedItems");


describe("removeUndefinedItems", function () {

	it("should remove undefind items", function () {
		var result = remove([1, undefined, 3, 4]);

		expect(result).to.have.length(3);
		expect(result).to.deep.equal([1, 3, 4]);
	});

	it("should remove undefind items at start", function () {
		var result = remove([undefined, 1, 3, 4]);

		expect(result).to.have.length(3);
		expect(result).to.deep.equal([1, 3, 4]);
	});

	it("should remove undefind items at end", function () {
		var result = remove([1, 3, 4, undefined]);

		expect(result).to.have.length(3);
		expect(result).to.deep.equal([1, 3, 4]);
	});

	it("should remove all undefined items", function () {
		var result = remove([undefined, 1, undefined, 3, 4, undefined]);

		expect(result).to.have.length(3);
		expect(result).to.deep.equal([1, 3, 4]);
	});
});
