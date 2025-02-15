/* eslint no-unused-expressions: 0 */
import "mocha";
import { strict as assert } from "assert";
import { remove } from "../../lib/remove";

const isObject = (v: unknown): v is Record<string, unknown> => Object.prototype.toString.call(v) === "[object Object]"

describe("remove", () => {
    it("should delete the given property", () => {
        const result = remove({ property: "propertyValue" }, "/property");

        assert.equal(result.property, undefined);
    });

    it("should work for simple property", () => {
        const result = remove({ a: { b: {}, c: {} } }, "a");

        assert.equal(result.a, undefined);
    });

    it("should return input for empty pointer", () => {
        const data = { a: { b: {}, c: {} } };
        const result = remove(JSON.parse(JSON.stringify(data)), "");

        assert.deepEqual(result, data);
    });

    it("should delete nested property only", () => {
        const result = remove({ a: { b: {}, c: {} } }, "/a/b");

        assert.equal(result.a.b, undefined);
        assert(isObject(result.a.c));
    });

    it("should accept list of properties as pointer", () => {
        const result = remove({ a: { b: {}, c: {} } }, ["a", "b"]);

        assert.equal(result.a.b, undefined);
        assert(isObject(result.a.c));
    });

    it("should ignore invalid paths", () => {
        const result = remove({ a: { b: {}, c: {} } }, "/a/d/c");

        assert.deepEqual(result, { a: { b: {}, c: {} } });
    });

    describe("array", () => {
        it("should delete item in array", () => {
            const result = remove({ array: [0, 1, 2] }, "/array/0");

            assert.equal(result.array.length, 2);
        });
    });

    describe("# (uri fragment)", () => {
        it("should delete nested property only", () => {
            const result = remove({ a: { b: {}, c: {} } }, "#/a/b");

            assert.equal(result.a.b, undefined);
            assert(isObject(result.a.c));
        });

        it("should delete item in array", () => {
            const result = remove({ array: [0, 1, 2] }, "#/array/0");

            assert.equal(result.array.length, 2);
        });
    });

    describe("escapes", () => {
        it("should interpret '~1' as '/' in property", () => {
            const result = remove({ "my/value": true }, "/my~1value");

            assert.equal(result["my/value"], undefined);
        });

        it("should interpret '~0' as '~' in property", () => {
            const result = remove({ "my~value": true }, "/my~0value");

            assert.equal(result["my~value"], undefined);
        });
    });
});
