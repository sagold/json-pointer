/* eslint no-unused-expressions: 0 */
import "mocha";
import { expect } from "chai";
import { split } from "../../lib/split";

describe("pointer.split", () => {
    it("should return empty array for missing pointer", () => {
        // @ts-ignore
        const result = split();

        expect(result).to.be.an("array");
        expect(result.length).to.eq(0);
    });

    it("should return empty array for invalid pointer", () => {
        // @ts-ignore
        const result = split({});

        expect(result).to.be.an("array");
        expect(result.length).to.eq(0);
    });

    it("should return empty array for empty string (root pointer)", () => {
        const result = split("");

        expect(result).to.be.an("array");
        expect(result.length).to.eq(0);
    });

    it("should return empty array for '#' (root pointer)", () => {
        const result = split("#");

        expect(result).to.be.an("array");
        expect(result.length).to.eq(0);
    });

    it("should return input array", () => {
        const result = split(["a", "b"]);

        expect(result).to.be.an("array");
        expect(result).to.deep.eq(["a", "b"]);
    });

    it("should return path properties in array", () => {
        const result = split("/my/path");

        expect(result).to.be.an("array");
        expect(result).to.deep.eq(["my", "path"]);
    });

    it("should return uri-path properties in array", () => {
        const result = split("#/my/path");

        expect(result).to.be.an("array");
        expect(result).to.deep.eq(["my", "path"]);
    });

    it("should treat root '/' as optional", () => {
        const result = split("my/path");

        expect(result).to.be.an("array");
        expect(result).to.deep.eq(["my", "path"]);
    });

    it("should ignore trailing slash", () => {
        const result = split("/my/path/");

        expect(result).to.be.an("array");
        expect(result).to.deep.eq(["my", "path"]);
    });

    it("should not ignore trailing whitespace", () => {
        const result = split("/my/path/ ");

        expect(result).to.be.an("array");
        expect(result).to.deep.eq(["my", "path", " "]);
    });

    it("should ignore empty properties", () => {
        const result = split("/my//path");

        expect(result).to.be.an("array");
        expect(result).to.deep.eq(["my", "path"]);
    });

    describe("rfc 6901", () => {
        it("should decode ~1 to /", () => {
            const result = split("/my~1/path");

            expect(result).to.be.an("array");
            expect(result).to.deep.eq(["my/", "path"]);
        });

        it("should decode ~0 to ~", () => {
            const result = split("/my~0/path");

            expect(result).to.be.an("array");
            expect(result).to.deep.eq(["my~", "path"]);
        });

        it("should decode ~01 to ~1", () => {
            const result = split("/my~01/path");

            expect(result).to.be.an("array");
            expect(result).to.deep.eq(["my~1", "path"]);
        });

        it("should not url decode %20 per default", () => {
            const result = split("/my%20/path");

            expect(result).to.be.an("array");
            expect(result).to.deep.eq(["my%20", "path"]);
        });

        it("should url decode %20 with a starting '#'", () => {
            const result = split("#/my%20/path");

            expect(result).to.be.an("array");
            expect(result).to.deep.eq(["my ", "path"]);
        });
    });
});
