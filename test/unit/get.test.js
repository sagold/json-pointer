/* eslint no-unused-expressions: 0 */
const expect = require("chai").expect;
const get = require("../../lib/get");


describe("get", () => {

    it("should return undefined if property does not exist", () => {
        const result = get({ property: "propertyValue" }, "/value");

        expect(result).to.be.undefined;
    });

    it("should return undefined if pointer is empty", () => {
        const result = get({ property: "propertyValue" }, null);

        expect(result).to.be.undefined;
    });

    it("should return value if falsy", () => {
        const result = get({ property: 0 }, "/property");

        expect(result).to.be.eq(0);
    });

    it("should not url decode %20", () => {
        const result = get({ "%20": 0 }, "/%20");

        expect(result).to.be.eq(0);
    });

    it("should return nested properties", () => {
        const result = get({ property: { value: "propertyValue" } }, "/property/value");

        expect(result).to.eq("propertyValue");
    });

    it("should return 'undefined' if nested property does not exist", () => {
        const result = get({ property: { value: "propertyValue" } }, "/property/missing/value");

        expect(result).to.be.undefined;
    });

    it("should resolve arrays", () => {
        const result = get(["0", { value: "propertyValue" }], "/1/value");

        expect(result).to.eq("propertyValue");
    });


    describe("# (uri fragment)", () => {

        it("should return nested properties", () => {
            const result = get({ property: { value: "propertyValue" } }, "#/property/value");

            expect(result).to.eq("propertyValue");
        });

        it("should escape url encoded values", () => {
            const result = get({ property: { "my value": "propertyValue" } }, "#/property/my%20value");

            expect(result).to.eq("propertyValue");
        });
    });


    describe("rfc 6901", () => {

        let data;
        beforeEach(() => (data = {
            foo: ["bar", "baz"],
            "": 0,
            "a/b": 1,
            "c%d": 2,
            "e^f": 3,
            "g|h": 4,
            "i\\j": 5,
            "k\"l": 6,
            " ": 7,
            "m~n": 8
        }));

        it("should return the document for an empty pointer", () => {
            const result = get(data, "");
            expect(result).to.eq(data);
        });

        it("should return first property", () => {
            const result = get(data, "/foo");
            expect(result).to.eq(data.foo);
        });

        it("should return first array item", () => {
            const result = get(data, "/foo/0");
            expect(result).to.eq("bar");
        });

        it("should return property '' for '/'", () => {
            const result = get(data, "/");
            expect(result).to.eq(0);
        });

        it("should escape '/' by '~1'", () => {
            const result = get(data, "/a~1b");
            expect(result).to.eq(1);
        });

        it("should interprete '%' as part of property", () => {
            const result = get(data, "/c%d");
            expect(result).to.eq(2);
        });

        it("should interprete '^' as part of property", () => {
            const result = get(data, "/e^f");
            expect(result).to.eq(3);
        });

        it("should interprete '|' as part of property", () => {
            const result = get(data, "/g|h");
            expect(result).to.eq(4);
        });

        it("should interprete '\\' as part of property", () => {
            const result = get(data, "/i\\j");
            expect(result).to.eq(5);
        });

        it("should interprete '\"' as part of property", () => {
            const result = get(data, "/k\"l");
            expect(result).to.eq(6);
        });

        it("should interprete ' ' as part of property", () => {
            const result = get(data, "/ ");
            expect(result).to.eq(7);
        });

        it("should escape '~0' as '~'", () => {
            const result = get(data, "/m~0n");
            expect(result).to.eq(8);
        });
    });

    // issue #1

    describe("issue #1", () => {
        it("should correctly escape ~0~1", () => {
            const result = get({
                "~0~1": false,
                "~/": true
            }, "/~0~1");

            expect(result).to.eq(true);
        });

        it("should correctly escape multiple escapes", () => {
            const result = get({
                "~0~1/0/1": true,
                "~00~01~10~11": false
            }, "/~00~01~10~11");

            expect(result).to.eq(true);
        });
    });
});
