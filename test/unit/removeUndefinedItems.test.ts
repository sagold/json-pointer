import "mocha";
import { strict as assert } from "assert";
import { removeUndefinedItems as remove } from "../../lib/removeUndefinedItems";

describe("removeUndefinedItems", () => {
    it("should remove undefind items", () => {
        const result = remove([1, undefined, 3, 4]);

        assert.equal(result.length, 3);
        assert.deepEqual(result, [1, 3, 4]);
    });

    it("should remove undefind items at start", () => {
        const result = remove([undefined, 1, 3, 4]);

        assert.equal(result.length, 3);
        assert.deepEqual(result, [1, 3, 4]);
    });

    it("should remove undefind items at end", () => {
        const result = remove([1, 3, 4, undefined]);

        assert.equal(result.length, 3);
        assert.deepEqual(result, [1, 3, 4]);
    });

    it("should remove all undefined items", () => {
        const result = remove([undefined, 1, undefined, 3, 4, undefined]);

        assert.equal(result.length, 3);
        assert.deepEqual(result, [1, 3, 4]);
    });
});
