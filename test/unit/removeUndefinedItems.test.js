const expect = require("chai").expect;
const remove = require("../../lib/removeUndefinedItems");


describe("removeUndefinedItems", () => {

    it("should remove undefind items", () => {
        const result = remove([1, undefined, 3, 4]);

        expect(result).to.have.length(3);
        expect(result).to.deep.equal([1, 3, 4]);
    });

    it("should remove undefind items at start", () => {
        const result = remove([undefined, 1, 3, 4]);

        expect(result).to.have.length(3);
        expect(result).to.deep.equal([1, 3, 4]);
    });

    it("should remove undefind items at end", () => {
        const result = remove([1, 3, 4, undefined]);

        expect(result).to.have.length(3);
        expect(result).to.deep.equal([1, 3, 4]);
    });

    it("should remove all undefined items", () => {
        const result = remove([undefined, 1, undefined, 3, 4, undefined]);

        expect(result).to.have.length(3);
        expect(result).to.deep.equal([1, 3, 4]);
    });
});
