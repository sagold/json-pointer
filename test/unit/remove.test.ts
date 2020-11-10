/* eslint no-unused-expressions: 0 */
import "mocha";
import { expect } from "chai";
import remove from "../../lib/remove";


describe("remove", () => {

    it("should delete the given property", () => {
        const result = remove({ property: "propertyValue" }, "/property");

        expect(result.property).to.be.undefined;
    });

    it("should work for simple property", () => {
        const result = remove({ a: { b: {}, c: {} } }, "a");

        expect(result.a).to.be.undefined;
    });

    it("should return input for empty pointer", () => {
        const data = { a: { b: {}, c: {} } };
        const result = remove(JSON.parse(JSON.stringify(data)), "");

        expect(result).deep.equal(data);
    });

    it("should delete nested property only", () => {
        const result = remove({ a: { b: {}, c: {} } }, "/a/b");

        expect(result.a.b).to.be.undefined;
        expect(result.a.c).to.be.instanceOf(Object);
    });

    it("should accept list of properties as pointer", () => {
        const result = remove({ a: { b: {}, c: {} } }, ["a", "b"]);

        expect(result.a.b).to.be.undefined;
        expect(result.a.c).to.be.instanceOf(Object);
    });

    it("should ignore invalid paths", () => {
        const result = remove({ a: { b: {}, c: {} } }, "/a/d/c");

        expect(result).to.deep.eq({ a: { b: {}, c: {} } });
    });

    describe("array", () => {

        it("should delete item in array", () => {
            const result = remove({ array: [0, 1, 2] }, "/array/0");

            expect(result.array).to.have.length(2);
        });
    });


    describe("# (uri fragment)", () => {

        it("should delete nested property only", () => {
            const result = remove({ a: { b: {}, c: {} } }, "#/a/b");

            expect(result.a.b).to.be.undefined;
            expect(result.a.c).to.be.instanceOf(Object);
        });

        it("should delete item in array", () => {
            const result = remove({ array: [0, 1, 2] }, "#/array/0");

            expect(result.array).to.have.length(2);
        });
    });

    describe("escapes", () => {

        it("should interpret '~1' as '/' in property", () => {
            const result = remove({ "my/value": true }, "/my~1value");

            expect(result["my/value"]).to.eq(undefined);
        });

        it("should interpret '~0' as '~' in property", () => {
            const result = remove({ "my~value": true }, "/my~0value");

            expect(result["my~value"]).to.eq(undefined);
        });
    });
});
