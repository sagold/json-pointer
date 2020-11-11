import { default as get } from "./lib/get";
import { default as set } from "./lib/set";
import { default as remove } from "./lib/remove";
import { default as join } from "./lib/join";
import { default as split } from "./lib/split";
import { default as isRoot } from "./lib/isRoot";
import { default as removeUndefinedItems } from "./lib/removeUndefinedItems";
declare const gp: {
    get: typeof get;
    set: typeof set;
    remove: typeof remove;
    join: typeof join;
    split: typeof split;
    isRoot: typeof isRoot;
    removeUndefinedItems: typeof removeUndefinedItems;
};
export default gp;
export { get, set, remove, join, split, isRoot, removeUndefinedItems };
