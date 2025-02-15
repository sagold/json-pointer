import "mocha";
import { strict as assert } from "assert";
import jp from "../../index";

describe("README", () => {
    describe("join", () => {
        it("join should add fragment uri and correctly escape pointer", () => {
            const uriSimple = jp.join("/my pointer/to/property", true);
            assert.equal(uriSimple, "#/my%20pointer/to/property");
        });

        it("should remove uri fragment from pointer", () => {
            const pointer = jp.join("#/my pointer", "to", "property", false);
            assert.equal(pointer, "/my pointer/to/property");
        });
    });
});
