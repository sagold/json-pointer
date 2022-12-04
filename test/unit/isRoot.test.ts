import "mocha";
import { expect } from "chai";
import { isRoot } from "../../lib/isRoot";

describe("isRoot", () => {
    it("should return true for a root pointer ''", () => {
        expect(isRoot("")).to.eq(true);
    });

    it("should return true for a root pointer '#'", () => {
        expect(isRoot("")).to.eq(true);
    });

    it("should return true for an empty json-path", () => {
        expect(isRoot([])).to.eq(true);
    });

    it("should return false for non-empty json-path", () => {
        expect(isRoot(["metadata"])).to.eq(false);
    });
});
