const expect = require("chai").expect;
const isRoot = require("../../lib/isRoot");


describe("isRoot", () => {

    it("should return true for a root pointer ''", () => {
        expect(isRoot("")).to.eq(true);
    });

    it("should return true for a root pointer '#'", () => {
        expect(isRoot("")).to.eq(true);
    });
});
