/* eslint no-unused-expressions: 0 */
import "mocha";
import { strict as assert } from "assert";
import { split } from "../../lib/split";

describe("pointer.split", () => {
    it("should return empty array for missing pointer", () => {
        // @ts-expect-error ignore input type
        const result = split();

        assert(Array.isArray(result));
        assert.equal(result.length, 0);
    });

    it("should return empty array for invalid pointer", () => {
        // @ts-expect-error ignore input type
        const result = split({});

        assert(Array.isArray(result));
        assert.equal(result.length, 0);
    });

    it("should return empty array for empty string (root pointer)", () => {
        const result = split("");

        assert(Array.isArray(result));
        assert.equal(result.length, 0);
    });

    it("should return empty array for '#' (root pointer)", () => {
        const result = split("#");

        assert(Array.isArray(result));
        assert.equal(result.length, 0);
    });

    it("should return input array", () => {
        const result = split(["a", "b"]);

        assert(Array.isArray(result));
        assert.deepEqual(result, ["a", "b"]);
    });

    it("should return path properties in array", () => {
        const result = split("/my/path");

        assert(Array.isArray(result));
        assert.deepEqual(result, ["my", "path"]);
    });

    it("should return uri-path properties in array", () => {
        const result = split("#/my/path");

        assert(Array.isArray(result));
        assert.deepEqual(result, ["my", "path"]);
    });

    it("should treat root '/' as optional", () => {
        const result = split("my/path");

        assert(Array.isArray(result));
        assert.deepEqual(result, ["my", "path"]);
    });

    it("should not ignore trailing slash", () => {
        const result = split("/my/path/");

        assert(Array.isArray(result));
        assert.deepEqual(result, ["my", "path", ""]);
    });

    it("should not ignore trailing whitespace", () => {
        const result = split("/my/path/ ");

        assert(Array.isArray(result));
        assert.deepEqual(result, ["my", "path", " "]);
    });

    it("should not ignore empty properties", () => {
        const result = split("/my//path");

        assert(Array.isArray(result));
        assert.deepEqual(result, ["my", "", "path"]);
    });

    describe("rfc 6901", () => {
        it("should decode ~1 to /", () => {
            const result = split("/my~1/path");

            assert(Array.isArray(result));
            assert.deepEqual(result, ["my/", "path"]);
        });

        it("should decode ~0 to ~", () => {
            const result = split("/my~0/path");

            assert(Array.isArray(result));
            assert.deepEqual(result, ["my~", "path"]);
        });

        it("should decode ~01 to ~1", () => {
            const result = split("/my~01/path");

            assert(Array.isArray(result));
            assert.deepEqual(result, ["my~1", "path"]);
        });

        it("should not url decode %20 per default", () => {
            const result = split("/my%20/path");

            assert(Array.isArray(result));
            assert.deepEqual(result, ["my%20", "path"]);
        });

        it("should url decode %20 with a starting '#'", () => {
            const result = split("#/my%20/path");

            assert(Array.isArray(result));
            assert.deepEqual(result, ["my ", "path"]);
        });
    });
});
