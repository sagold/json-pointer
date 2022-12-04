import "mocha";
import { expect } from "chai";
import { join } from "../../lib/join";

describe("pointer.join", () => {
    it("should return an empty string (root pointer)", () => {
        // @ts-ignore
        const pointer = join();

        expect(pointer).to.eq("");
    });

    it("should return root pointer if the input is a boolean", () => {
        // @ts-ignore
        const result = join(false);

        expect(result).to.eq("");
    });

    it("should join multiple pointers", () => {
        const pointer = join("/parent", "/child", "/target");

        expect(pointer).to.eq("/parent/child/target");
    });

    it("should join single words to a pointer", () => {
        const pointer = join("parent", "child", "target");

        expect(pointer).to.eq("/parent/child/target");
    });

    it("should ignore empty values", () => {
        const pointer = join("parent", null, "target");

        expect(pointer).to.eq("/parent/target");
    });

    it("should ignore non-strings values", () => {
        const pointer = join("parent", {}, false, "target");

        expect(pointer).to.eq("/parent/target");
    });

    it("should not have multiple slashes", () => {
        const pointer = join("/", "", "first");

        expect(pointer).to.eq("/first");
    });

    it("should resolve relative pointers", () => {
        const pointer = join("/first/second/third", "../../2");

        expect(pointer).to.eq("/first/2");
    });

    it("should return parent pointer", () => {
        const pointer = join("/first/second/third", "..");

        expect(pointer).to.eq("/first/second");
    });

    it("should return root pointer", () => {
        const pointer = join("/first", "..");

        expect(pointer).to.eq("");
    });

    it("should return root if relative pointer exceeds root", () => {
        const pointer = join("/", "..");

        expect(pointer).to.eq("");
    });

    it("should return root if relative pointer exceeds root and no root is specified", () => {
        const pointer = join("..");

        expect(pointer).to.eq("");
    });

    it("should return root if relative path is invalid", () => {
        const pointer = join("", "..", "../first");

        expect(pointer).to.eq("");
    });

    it("should strip uri fragment with a trailing 'false' value", () => {
        const pointer = join("#/first", false);

        expect(pointer).to.eq("/first");
    });

    describe("# (uri fragment)", () => {
        it("should return root pointer", () => {
            const pointer = join("#/first", "..");

            expect(pointer).to.eq("#");
        });

        it("should return parent pointer", () => {
            const pointer = join("#/first/second/third", "..");

            expect(pointer).to.eq("#/first/second");
        });

        it("should ignore fragment uri if encountered within path", () => {
            const pointer = join("/first/second", "#/third", "..");

            expect(pointer).to.eq("/first/second");
        });

        it("should percent decode contained uri fragment pointer", () => {
            const pointer = join("/pointer", "#/my%20value");

            expect(pointer).to.eq("/pointer/my value");
        });

        it("should return uri root pointer if the input is a boolean with `true`", () => {
            // @ts-ignore
            const result = join(true);

            expect(result).to.eq("#");
        });

        it("should return a uri fragment pointer if the last argument is `true`", () => {
            const result = join("pointer", "/myValue", true);

            expect(result).to.eq("#/pointer/myValue");
        });

        it("should convert pointer to uri pointer", () => {
            const result = join("/pointer", true);

            expect(result).to.eq("#/pointer");
        });

        it("should not modify uri pointer", () => {
            const result = join("#/pointer", true);

            expect(result).to.eq("#/pointer");
        });
    });

    describe("escapes", () => {
        it("should escape / with ~1", () => {
            const pointer = join("value~11", "value2");

            expect(pointer).to.eq("/value~11/value2");
        });

        it("should escape ~ with ~0", () => {
            const pointer = join("value~01", "value2");

            expect(pointer).to.eq("/value~01/value2");
        });

        it("should correctly escape '~' and '/", () => {
            const pointer = join("value~0~1", "value2");

            expect(pointer).to.eq("/value~0~1/value2");
        });

        it("should url encode pointer starting with fragment url", () => {
            const pointer = join("#/my value", "value2");

            expect(pointer).to.eq("#/my%20value/value2");
        });
    });

    describe("array", () => {
        it("should return an empty string for an empty list", () => {
            const pointer = join([]);

            expect(pointer).to.eq("");
        });

        it("should accept a list of properties", () => {
            const pointer = join(["one", "two"]);

            expect(pointer).to.eq("/one/two");
        });

        it("should escape list items", () => {
            const pointer = join(["one/three", "two"]);

            expect(pointer).to.eq("/one~1three/two");
        });

        describe("# (uri fragment)", () => {
            it("should return a '#' for an empty list", () => {
                const pointer = join([], true);

                expect(pointer).to.eq("#");
            });

            it("should join all list items", () => {
                const pointer = join(["one", "two"], true);

                expect(pointer).to.eq("#/one/two");
            });

            it("should escape list items", () => {
                const pointer = join(["one/three", "two"], true);

                expect(pointer).to.eq("#/one~1three/two");
            });
        });
    });
});
