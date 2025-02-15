import "mocha";
import { strict as assert } from "assert";
import { join } from "../../lib/join";

describe("pointer.join", () => {
    it("should return an empty string (root pointer)", () => {
        const pointer = join();

        assert.equal(pointer, "");
    });

    it("should return root pointer if the input is a boolean", () => {
        const result = join(false);

        assert.equal(result, "");
    });

    it("should join multiple pointers", () => {
        const pointer = join("/parent", "/child", "/target");

        assert.equal(pointer, "/parent/child/target");
    });

    it("should join single words to a pointer", () => {
        const pointer = join("parent", "child", "target");

        assert.equal(pointer, "/parent/child/target");
    });

    it("should join multiple root pointers to one", () => {
        const pointer = join("#", "#");

        assert.equal(pointer, "#");
    });

    it("should join multiple root pointers correctly", () => {
        const pointer = join("#/first", "#/third");

        assert.equal(pointer, "#/first/third");
    });

    it("should ignore null values", () => {
        const pointer = join("parent", null, "target");

        assert.equal(pointer, "/parent/target");
    });

    it("should ignore non-strings values", () => {
        // @ts-expect-error ignore input type
        const pointer = join("parent", {}, false, "target");

        assert.equal(pointer, "/parent/target");
    });

    describe("empty property", () => {
        it("should support empty properties", () => {
            const pointer = join("/", "", "first");

            assert.equal(pointer, "//first");
        });

        it("should support empty properties in pointer", () => {
            const pointer = join("/first", "second//third");

            assert.equal(pointer, "/first/second//third");
        });

        it("should correctly join intermediate pointer havgin trailing empty property", () => {
            const pointer = join("/a/", "/b");

            assert.equal(pointer, "/a//b");
        });

        it("should correctly join successive empty properties", () => {
            const pointer = join("/a/", "//b");

            assert.equal(pointer, "/a///b");
        });

        it("should return with trailing empty property", () => {
            const pointer = join("/a", "/b/");

            assert.equal(pointer, "/a/b/");
        });
    })

    it("should resolve relative pointers", () => {
        const pointer = join("/first/second/third", "../../2");

        assert.equal(pointer, "/first/2");
    });

    it("should return parent pointer", () => {
        const pointer = join("/first/second/third", "..");

        assert.equal(pointer, "/first/second");
    });

    it("should return root pointer", () => {
        const pointer = join("/first", "..");

        assert.equal(pointer, "");
    });

    it("should return root if relative pointer exceeds root", () => {
        const pointer = join("/", "..");

        assert.equal(pointer, "");
    });

    it("should return root if relative pointer exceeds root and no root is specified", () => {
        const pointer = join("..");

        assert.equal(pointer, "");
    });

    it("should return root if relative path is invalid", () => {
        const pointer = join("", "..", "../first");

        assert.equal(pointer, "");
    });

    it("should strip uri fragment with a trailing 'false' value", () => {
        const pointer = join("#/first", false);

        assert.equal(pointer, "/first");
    });

    describe("# (uri fragment)", () => {
        it("should return root pointer", () => {
            const pointer = join("#/first", "..");

            assert.equal(pointer, "#");
        });

        it("should return parent pointer", () => {
            const pointer = join("#/first/second/third", "..");

            assert.equal(pointer, "#/first/second");
        });

        it("should ignore fragment uri if encountered within path", () => {
            const pointer = join("/first/second", "#/third", "..");

            assert.equal(pointer, "/first/second");
        });

        it("should percent decode contained uri fragment pointer", () => {
            const pointer = join("/pointer", "#/my%20value");

            assert.equal(pointer, "/pointer/my value");
        });

        it("should return uri root pointer if the input is a boolean with `true`", () => {
            const result = join(true);

            assert.equal(result, "#");
        });

        it("should return a uri fragment pointer if the last argument is `true`", () => {
            const result = join("pointer", "/myValue", true);

            assert.equal(result, "#/pointer/myValue");
        });

        it("should convert pointer to uri pointer", () => {
            const result = join("/pointer", true);

            assert.equal(result, "#/pointer");
        });

        it("should not modify uri pointer", () => {
            const result = join("#/pointer", true);

            assert.equal(result, "#/pointer");
        });
    });

    describe("escapes", () => {
        it("should escape / with ~1", () => {
            const pointer = join("value~11", "value2");

            assert.equal(pointer, "/value~11/value2");
        });

        it("should escape ~ with ~0", () => {
            const pointer = join("value~01", "value2");

            assert.equal(pointer, "/value~01/value2");
        });

        it("should correctly escape '~' and '/", () => {
            const pointer = join("value~0~1", "value2");

            assert.equal(pointer, "/value~0~1/value2");
        });

        it("should url encode pointer starting with fragment url", () => {
            const pointer = join("#/my value", "value2");

            assert.equal(pointer, "#/my%20value/value2");
        });
    });

    describe("array", () => {
        it("should return an empty string for an empty list", () => {
            const pointer = join([]);

            assert.equal(pointer, "");
        });

        it("should accept a list of properties", () => {
            const pointer = join(["one", "two"]);

            assert.equal(pointer, "/one/two");
        });

        it("should escape list items", () => {
            const pointer = join(["one/three", "two"]);

            assert.equal(pointer, "/one~1three/two");
        });

        describe("# (uri fragment)", () => {
            it("should return a '#' for an empty list", () => {
                const pointer = join([], true);

                assert.equal(pointer, "#");
            });

            it("should join all list items", () => {
                const pointer = join(["one", "two"], true);

                assert.equal(pointer, "#/one/two");
            });

            it("should escape list items", () => {
                const pointer = join(["one/three", "two"], true);

                assert.equal(pointer, "#/one~1three/two");
            });
        });
    });
});
