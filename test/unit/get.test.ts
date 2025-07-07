/* eslint no-unused-expressions: 0 */
import "mocha";
import { strict as assert } from "assert";
import { get } from "../../lib/get";

describe("pointer.get", () => {
    it("should return undefined if property does not exist", () => {
        const result = get({ property: "propertyValue" }, "/value");
        assert.equal(result, undefined);
    });

    it("should return undefined if pointer is empty", () => {
        const result = get({ property: "propertyValue" }, null);
        assert.equal(result, undefined);
    });

    it("should return value if falsy", () => {
        const result = get({ property: 0 }, "/property");
        assert.equal(result, 0);
    });

    it("should not url decode %20", () => {
        const result = get({ "%20": 0 }, "/%20");
        assert.equal(result, 0);
    });

    it("should return nested properties", () => {
        const result = get(
            { property: { value: "propertyValue" } },
            "/property/value"
        );
        assert.equal(result, "propertyValue");
    });

    it("should return 'undefined' if nested property does not exist", () => {
        const result = get(
            { property: { value: "propertyValue" } },
            "/property/missing/value"
        );
        assert.equal(result, undefined);
    });

    it("should resolve arrays", () => {
        const result = get(["0", { value: "propertyValue" }], "/1/value");
        assert.equal(result, "propertyValue");
    });

    it("should also accept a list of properties as pointer", () => {
        const result = get({ property: { value: "propertyValue" } }, [
            "property",
            "value",
        ]);
        assert.equal(result, "propertyValue");
    });

    it("should not modify input path-array", () => {
        const path = ["property", "value"];
        const result = get({ property: { value: "propertyValue" } }, path);
        assert.equal(result, "propertyValue");

        assert.deepEqual(path, ["property", "value"]);
    });

    it("should return 'defaultValue' if property does not exist", () => {
        const result = get(
            { property: { value: "propertyValue" } },
            "/property/missing",
            42
        );
        assert.equal(result, 42);
    });

    it("should also accept a list of properties as pointer", () => {
        const result = get({ property: { value: "propertyValue" } }, [
            "property",
            "value",
        ]);
        assert.equal(result, "propertyValue");
    });

    describe("empty tokens", () => {
        it("should return empty root-property", () => {
            const result = get({ "": 7 }, "/");
            assert.equal(result, 7);
        });

        it("should return empty object-property", () => {
            const result = get({ header: { "": 7 } }, "/header/");
            assert.equal(result, 7);
        });

        it("should return property from empty-property", () => {
            const result = get({ "": { header: 7 } }, "//header");
            assert.equal(result, 7);
        });
    });

    describe("rfc 6901", () => {
        let data;
        beforeEach(
            () =>
            (data = {
                foo: ["bar", "baz"],
                "": 0,
                "a/b": 1,
                "c%d": 2,
                "e^f": 3,
                "g|h": 4,
                "i\\j": 5,
                'k"l': 6,
                " ": 7,
                "m~n": 8,
            })
        );

        it("should return the document for an empty pointer", () => {
            const result = get(data, "");
            assert.equal(result, data);
        });

        it("should return first property", () => {
            const result = get(data, "/foo");
            assert.equal(result, data.foo);
        });

        it("should return first array item", () => {
            const result = get(data, "/foo/0");
            assert.equal(result, "bar");
        });

        it("should return property '' for '/'", () => {
            const result = get(data, "/");
            assert.equal(result, 0);
        });

        it("should escape '/' by '~1'", () => {
            const result = get(data, "/a~1b");
            assert.equal(result, 1);
        });

        it("should interprete '%' as part of property", () => {
            const result = get(data, "/c%d");
            assert.equal(result, 2);
        });

        it("should interprete '^' as part of property", () => {
            const result = get(data, "/e^f");
            assert.equal(result, 3);
        });

        it("should interprete '|' as part of property", () => {
            const result = get(data, "/g|h");
            assert.equal(result, 4);
        });

        it("should interprete '\\' as part of property", () => {
            const result = get(data, "/i\\j");
            assert.equal(result, 5);
        });

        it("should interprete '\"' as part of property", () => {
            const result = get(data, '/k"l');
            assert.equal(result, 6);
        });

        it("should interprete ' ' as part of property", () => {
            const result = get(data, "/ ");
            assert.equal(result, 7);
        });

        it("should escape '~0' as '~'", () => {
            const result = get(data, "/m~0n");
            assert.equal(result, 8);
        });
    });

    describe("rfc 6901 - uri fragment", () => {
        let data;
        beforeEach(
            () =>
            (data = {
                foo: ["bar", "baz"],
                "": 0,
                "a/b": 1,
                "c%d": 2,
                "e^f": 3,
                "g|h": 4,
                "i\\j": 5,
                'k"l': 6,
                " ": 7,
                "m~n": 8,
            })
        );

        it("should return the root document for '#'", () => {
            const result = get(data, "#");
            assert.equal(result, data);
        });

        it("should return property", () => {
            const result = get(data, "#/foo");
            assert.deepEqual(result, ["bar", "baz"]);
        });

        it("should return nested array item", () => {
            const result = get(data, "#/foo/0");
            assert.equal(result, "bar");
        });

        it("should return empty property", () => {
            const result = get(data, "#/");
            assert.equal(result, 0);
        });

        it("should return property containing '/'", () => {
            const result = get(data, "#/a~1b");
            assert.equal(result, 1);
        });

        it("should return property containing '%'", () => {
            const result = get(data, "#/c%25d");
            assert.equal(result, 2);
        });

        it("should return property containing '^'", () => {
            const result = get(data, "#/e%5Ef");
            assert.equal(result, 3);
        });

        it("should return property containing '|'", () => {
            const result = get(data, "#/g%7Ch");
            assert.equal(result, 4);
        });

        it("should return property containing '|'", () => {
            const result = get(data, "#/i%5Cj");
            assert.equal(result, 5);
        });

        it("should return property containing '\"'", () => {
            const result = get(data, "#/k%22l");
            assert.equal(result, 6);
        });

        it("should return property containing ' '", () => {
            const result = get(data, "#/%20");
            assert.equal(result, 7);
        });

        it("should return property containing '~", () => {
            const result = get(data, "#/m~0n");
            assert.equal(result, 8);
        });
    });

    describe("issue #1", () => {
        it("should correctly escape ~0~1", () => {
            const result = get(
                {
                    "~0~1": false,
                    "~/": true,
                },
                "/~0~1"
            );

            assert.equal(result, true);
        });

        it("should correctly escape multiple escapes", () => {
            const result = get(
                {
                    "~0~1/0/1": true,
                    "~00~01~10~11": false,
                },
                "/~00~01~10~11"
            );

            assert.equal(result, true);
        });
    });
});
