/* eslint no-unused-expressions: 0 */
const expect = require("chai").expect;
const pointer = require("../../index");


describe("pointer.delete", () => {

    it("should delete the given property", () => {
        const result = pointer.delete({ property: "propertyValue" }, "/property");

        expect(result.property).to.be.undefined;
    });

    it("should work for simple property", () => {
        const result = pointer.delete({ a: { b: {}, c: {} } }, "a");

        expect(result.a).to.be.undefined;
    });

    it("should return input for empty pointer", () => {
        const data = { a: { b: {}, c: {} } };
        const result = pointer.delete(JSON.parse(JSON.stringify(data)), "");

        expect(result).deep.equal(data);
    });

    it("should delete nested property only", () => {
        const result = pointer.delete({ a: { b: {}, c: {} } }, "/a/b");

        expect(result.a.b).to.be.undefined;
        expect(result.a.c).to.be.instanceOf(Object);
    });


    describe("array", () => {

        it("should delete item in array", () => {
            const result = pointer.delete({ array: [0, 1, 2] }, "/array/0");

            expect(result.array).to.have.length(2);
        });
    });


    describe("# (uri fragment)", () => {

        it("should delete nested property only", () => {
            const result = pointer.delete({ a: { b: {}, c: {} } }, "#/a/b");

            expect(result.a.b).to.be.undefined;
            expect(result.a.c).to.be.instanceOf(Object);
        });

        it("should delete item in array", () => {
            const result = pointer.delete({ array: [0, 1, 2] }, "#/array/0");

            expect(result.array).to.have.length(2);
        });
    });

    describe("rfc6901", () => {

        it("should interpret '~1' as '/' in property", () => {
            const result = pointer.delete({ "my/value": true }, "/my~1value");

            expect(result["my/value"]).to.eq(undefined);
        });

        it("should interpret '~0' as '~' in property", () => {
            const result = pointer.delete({ "my~value": true }, "/my~0value");

            expect(result["my~value"]).to.eq(undefined);
        });
    });
});
