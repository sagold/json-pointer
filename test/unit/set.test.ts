/* eslint no-unused-expressions: 0 */
import "mocha";
import { strict as assert } from "assert";
import { set } from "../../lib/set";

const isObject = (v: unknown): v is Record<string, unknown> => Object.prototype.toString.call(v) === "[object Object]"

describe("pointer.set", () => {
    it("should return data for an invalid pointer", () => {
        const data = {};
        // @ts-ignore
        const result = set(data);

        assert.equal(result, data);
    });

    it("should create a new object for missing data and object pointer", () => {
        const result = set<Record<string, any> | null>(null, "/property", true);

        assert(result?.property);
        assert.equal(result.property, true)
    });

    it("should create a new array for missing data and array property", () => {
        const result = set(null, "/[]", true);

        assert(result);
        assert.equal(result[0], true)
    });

    it("should ignore operation if pointer is root ", () => {
        const result = set({}, "#", true);
        assert.deepEqual(result, {});
    });

    it("should add value to the given property", () => {
        const result = set<{ property?: any }>({}, "/property", true);

        assert("property" in result);
        assert.equal(result.property, true)
    });

    it("should add value on the given path", () => {
        const result = set<{ path?: { to?: { property?: any } } }>(
            {},
            "/path/to/property",
            true
        );

        assert(result?.path?.to);
        assert.equal(result.path.to.property, true)
    });

    it("should not remove any other properties", () => {
        const result = set<{ path?: { to?: { property?: any; id: string } } }>(
            { path: { to: { id: "parent" } } },
            "/path/to/property",
            true
        );

        assert(result?.path?.to);
        assert.equal(result.path.to.property, true)
        assert.equal(result.path.to.id, "parent");
    });

    it("should insert array for []", () => {
        const result = set<{ array?: any[] }>({}, "/array/[]", true);

        assert(result?.array);
        assert(Array.isArray(result.array));
        assert.equal(result.array.length, 1);
    });

    it("should insert index in array using array-syntax", () => {
        const result = set<{ array?: any[] }>({}, "/array/[1]", true);

        assert(result.array);
        assert(Array.isArray(result.array));
        assert.equal(result.array.length, 2);
        assert.equal(result.array[1], true)
    });

    it("should insert index in array using number as string", () => {
        const result = set<{ array?: any[] }>({}, "/array/1", true);

        assert(result.array);
        assert(Array.isArray(result.array));
        assert.equal(result.array.length, 2);
        assert.equal(result.array[1], true)
    });

    it("should insert object using object-syntax", () => {
        const result = set<{ array?: any[] }>({}, "/array/{1}", true);

        assert(result.array);
        assert(isObject(result.array));
        assert.deepEqual(result.array, { "1": true });
    });

    it("should append item to array", () => {
        const result = set<{ array: any[] }>({ array: ["first"] }, "/array/[]", "next");

        assert(Array.isArray(result.array));
        assert.deepEqual(result.array, ["first", "next"])
    });

    it("should insert array in array", () => {
        const result = set<{ array?: any[] }>({}, "/array/[]/[]", true);

        assert(result.array);
        assert(Array.isArray(result.array));
        assert.equal(result.array[0][0], true)
    });

    it("should insert array to index in array using array-syntax", () => {
        const result = set<{ array?: any[] }>({}, "/array/[1]/[]", true);

        assert(result.array);
        assert(Array.isArray(result.array));
        assert.equal(result.array[1][0], true)
    });

    it("should insert array to index in array using number as string", () => {
        const result = set<{ array?: any[] }>({}, "/array/1/[]", true);

        assert(result.array);
        assert(Array.isArray(result.array));
        assert.equal(result.array[1][0], true)
    });

    it("should insert object in array", () => {
        const result = set<{ array?: any[] }>(
            {},
            "/array/[1]/valid",
            true
        );

        assert(result.array);
        assert.equal(result.array.length, 2);
        assert(isObject(result.array[1]));
        assert.equal(result.array[1].valid, true)
    });

    it("should add property to object in array", () => {
        const result = set<{ array: any[] }>(
            { array: ["first", { id: 123 }] },
            "/array/[1]/valid",
            true
        );

        assert.equal(result.array.length, 2);
        assert.equal(result.array[0], "first");
        assert.deepEqual(result.array[1], { id: 123, valid: true });
    });

    it("should append object in array", () => {
        const result = set<{ array: any[] }>(
            { array: ["first", { id: 123 }] },
            "/array/[]/valid",
            true
        );

        assert.equal(result.array.length, 3)
        assert.equal(result.array[0], "first")
        assert.deepEqual(result.array[1], { id: 123 });
        assert.deepEqual(result.array[2], { valid: true });
    });

    it("should accept a list of properties as pointer", () => {
        const result = set<{ array?: any[] }>(
            {},
            ["array", "[1]", "valid"],
            true
        );

        assert(result.array);
        assert.equal(result.array.length, 2)
        assert(isObject(result.array[1]));
        assert.equal(result.array[1].valid, true)
    });

    describe("# (uri fragment)", () => {
        it("should add value on the given path", () => {
            const result = set<{ path?: { to?: { property?: boolean } } }>(
                {},
                "#/path/to/property",
                true
            );

            assert(result.path?.to);
            assert.equal(result.path.to.property, true)
        });

        it("should insert object in array", () => {
            const result = set<{ array?: any[] }>(
                {},
                "#/array/[1]/valid",
                true
            );

            assert(result.array);
            assert.equal(result.array.length, 2);
            assert(isObject(result.array[1]));
            assert.equal(result.array[1].valid, true)
        });
    });

    describe("escapes", () => {
        it("should interpret '~1' as '/' in property", () => {
            const result = set({}, "/my~1value", true);

            assert.equal(result["my/value"], true);
        });

        it("should interpret '~0' as '~' in property", () => {
            const result = set({}, "/my~0value", true);

            assert.equal(result["my~value"], true);
        });
    });
});
