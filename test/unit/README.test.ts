import "mocha";
import { expect } from "chai";
import jp from "../../index";

describe("README", () => {
    describe("join", () => {
        it("join should add fragment uri and correctly escape pointer", () => {
            const uriSimple = jp.join("/my pointer/to/property", true);
            expect(uriSimple).to.eq("#/my%20pointer/to/property");
        });

        it("should remove uri fragment from pointer", () => {
            const pointer = jp.join("#/my pointer", "to", "property", false);
            expect(pointer).to.eq("/my pointer/to/property");
        });
    });
});
