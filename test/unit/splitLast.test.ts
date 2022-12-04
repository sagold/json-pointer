/* eslint no-unused-expressions: 0 */
import "mocha";
import { expect } from "chai";
import { splitLast } from "../../lib/splitLast";

describe("pointer.splitLast", () => {
    it("should return root pointer and undefined for invalid input", () => {
        // @ts-ignore
        const result = splitLast();

        expect(result).to.be.an("array");
        expect(result.length).to.eq(2);
        expect(result).to.deep.equal(["", undefined]);
    });

    it("should return root pointer and undefined for root pointer #", () => {
        const result = splitLast("#");

        expect(result).to.be.an("array");
        expect(result.length).to.eq(2);
        expect(result).to.deep.equal(["#", undefined]);
    });

    it("should return root pointer and undefined for root pointer ''", () => {
        const result = splitLast("");

        expect(result).to.be.an("array");
        expect(result.length).to.eq(2);
        expect(result).to.deep.equal(["", undefined]);
    });

    it("should return parent pointer and last property", () => {
        const result = splitLast("/parent/path/property");

        expect(result).to.be.an("array");
        expect(result.length).to.eq(2);
        expect(result).to.deep.equal(["/parent/path", "property"]);
    });

    it("should return fragment parent pointer and last property", () => {
        const result = splitLast("#/parent/path/property");

        expect(result).to.be.an("array");
        expect(result.length).to.eq(2);
        expect(result).to.deep.equal(["#/parent/path", "property"]);
    });
});
