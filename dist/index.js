"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AssertionError_1 = require("./AssertionError");
var Comparator_1 = require("./Comparator");
function expect(actual) {
    return {
        includes: {
            item: function (item) {
                if (!Comparator_1.lazyDeepEquals(actual, item)) {
                    throw new AssertionError_1.AssertionError({
                        message: "Expected object is not includes item.\nexpected: " + JSON.stringify(actual, null, "  ") + "\nbut was: " + JSON.stringify(item, null, "  "),
                        expected: actual,
                        actual: item,
                    });
                }
            },
            items: function (items) {
                if (Array.isArray(actual)) {
                    if (!Comparator_1.leftArrayIncludesRightArray(actual, items)) {
                        throw new AssertionError_1.AssertionError({
                            message: "Expected array are not includes item.\nexpected: " + JSON.stringify(actual, null, "  ") + "\nbut was: " + JSON.stringify(items, null, "  "),
                            expected: actual,
                            actual: items,
                        });
                    }
                }
                else {
                    throw new Error("not implemented");
                }
            },
            lazy: {
                item: function (item) {
                    if (!Comparator_1.lazyDeepEquals(actual, item)) {
                        throw new AssertionError_1.AssertionError({
                            message: "Expected object is not includes item.\nexpected: " + JSON.stringify(actual, null, "  ") + "\nbut was: " + JSON.stringify(item, null, "  "),
                            expected: actual,
                            actual: item,
                        });
                    }
                },
                items: function (items) {
                    if (Array.isArray(actual)) {
                        if (!Comparator_1.leftArrayIncludesRightArray(actual, items, Comparator_1.lazyDeepEquals)) {
                            throw new AssertionError_1.AssertionError({
                                message: "Expected array are not includes item.\nexpected: " + JSON.stringify(actual, null, "  ") + "\nbut was: " + JSON.stringify(items, null, "  "),
                                expected: actual,
                                actual: items,
                            });
                        }
                    }
                    else {
                        throw new Error("not implemented");
                    }
                },
            }
        },
        deepEquals: function (expected) {
            if (!Comparator_1.deepEquals(actual, expected)) {
                throw new AssertionError_1.AssertionError({
                    message: "Expected object is not includes item.\nexpected: " + JSON.stringify(expected, null, "  ") + "\nbut was: " + JSON.stringify(actual, null, "  "),
                    expected: expected,
                    actual: actual,
                });
            }
        },
        lazy: {
            deepEquals: function (expected) {
                if (!Comparator_1.lazyDeepEquals(actual, expected)) {
                    throw new AssertionError_1.AssertionError({
                        message: "Expected object is not includes item.\nexpected: " + JSON.stringify(expected, null, "  ") + "\nbut was: " + JSON.stringify(actual, null, "  "),
                        expected: expected,
                        actual: actual,
                    });
                }
            }
        }
    };
}
exports.expect = expect;
