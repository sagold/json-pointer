const expect = require("chai").expect;
const gp = require("../../index");


describe("README", () => {


    describe("join", () => {

        it("join should add fragment uri and correctly escape pointer", () => {
            const uriSimple = gp.join("/my pointer/to/property", true);
            expect(uriSimple).to.eq("#/my%20pointer/to/property");
        });

        it("should remove uri fragment from pointer", () => {
            const pointer = gp.join("#/my pointer", "to", "property", false);
            expect(pointer).to.eq("/my pointer/to/property");
        });
    });
});
