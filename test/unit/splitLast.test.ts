/* eslint no-unused-expressions: 0 */
import "mocha";
import { strict as assert } from "assert";
import { splitLast } from "../../lib/splitLast";

describe("pointer.splitLast", () => {
    it("should return root pointer and undefined for invalid input", () => {
        // @ts-ignore
        const result = splitLast();

        assert(Array.isArray(result));
        assert.equal(result.length, 2);
        assert.deepEqual(result, ["", undefined]);
    });

    it("should return root pointer and undefined for root pointer #", () => {
        const result = splitLast("#");

        assert(Array.isArray(result));
        assert.equal(result.length, 2);
        assert.deepEqual(result, ["#", undefined]);
    });

    it("should return root pointer and undefined for root pointer ''", () => {
        const result = splitLast("");

        assert(Array.isArray(result));
        assert.equal(result.length, 2);
        assert.deepEqual(result, ["", undefined]);
    });

    it("should return parent pointer and last property", () => {
        const result = splitLast("/parent/path/property");

        assert(Array.isArray(result));
        assert.equal(result.length, 2);
        assert.deepEqual(result, ["/parent/path", "property"]);
    });

    it("should return fragment parent pointer and last property", () => {
        const result = splitLast("#/parent/path/property");

        assert(Array.isArray(result));
        assert.equal(result.length, 2);
        assert.deepEqual(result, ["#/parent/path", "property"]);
    });
});
