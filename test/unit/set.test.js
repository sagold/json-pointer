/* eslint no-unused-expressions: 0 */
const expect = require("chai").expect;
const set = require("../../lib/set");


describe("pointer.set", () => {

    it("should return data fo an invalid pointer", () => {
        const data = {};
        const result = set(data);

        expect(result).to.eq(data);
    });

    it("should create a new object for missing data and object pointer", () => {
        const result = set(null, "/property", true);

        expect(result.property).to.be.true;
    });

    it("should create a new array for missing data and array property", () => {
        const result = set(null, "/[]", true);
        expect(result[0]).to.be.true;
    });

    it("should add value to the given property", () => {
        const result = set({}, "/property", true);

        expect(result).to.have.property("property");
        expect(result.property).to.be.true;
    });

    it("should add value on the given path", () => {
        const result = set({}, "/path/to/property", true);

        expect(result.path.to.property).to.be.true;
    });

    it("should not remove any other properties", () => {
        const result = set({
            path: { to: { id: "parent" } }
        }, "/path/to/property", true);

        expect(result.path.to.property).to.be.true;
        expect(result.path.to.id).to.eq("parent");
    });

    it("should insert array for []", () => {
        const result = set({}, "/array/[]", true);

        expect(result.array).to.be.an.array;
        expect(result.array.length).to.eq(1);
    });

    it("should insert index in array", () => {
        const result = set({}, "/array/[1]", true);

        expect(result.array).to.be.an.array;
        expect(result.array.length).to.eq(2);
        expect(result.array[1]).to.be.true;
    });

    it("should insert array in array", () => {
        const result = set({}, "/array/[]/[]", true);

        expect(result.array[0]).to.be.an.array;
        expect(result.array[0][0]).to.be.true;
    });

    it("should insert array to index in array", () => {
        const result = set({}, "/array/[1]/[]", true);

        expect(result.array[1]).to.be.an.array;
        expect(result.array[1][0]).to.be.true;
    });

    it("should insert object in array", () => {
        const result = set({}, "/array/[1]/valid", true);

        expect(result.array.length).to.eq(2);
        expect(result.array[1]).to.be.an.object;
        expect(result.array[1].valid).to.be.true;
    });

    describe("# (uri fragment)", () => {

        it("should add value on the given path", () => {
            const result = set({}, "#/path/to/property", true);

            expect(result.path.to.property).to.be.true;
        });

        it("should insert object in array", () => {
            const result = set({}, "#/array/[1]/valid", true);

            expect(result.array.length).to.eq(2);
            expect(result.array[1]).to.be.an.object;
            expect(result.array[1].valid).to.be.true;
        });
    });

    describe("rfc6901", () => {

        it("should interpret '~1' as '/' in property", () => {
            const result = set({}, "/my~1value", true);

            expect(result["my/value"]).to.eq(true);
        });

        it("should interpret '~0' as '~' in property", () => {
            const result = set({}, "/my~0value", true);

            expect(result["my~value"]).to.eq(true);
        });
    });
});
