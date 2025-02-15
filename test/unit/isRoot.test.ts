import "mocha";
import { strict as assert } from "assert";
import { isRoot } from "../../lib/isRoot";

describe("isRoot", () => {
    it("should return true for a root pointer ''", () => {
        assert.equal(isRoot(""), true);
    });

    it("should return true for a root pointer '#'", () => {
        assert.equal(isRoot(""), true);
    });

    it("should return true for an empty json-path", () => {
        assert.equal(isRoot([]), true);
    });

    it("should return false for non-empty json-path", () => {
        assert.equal(isRoot(["metadata"]), false);
    });
});
