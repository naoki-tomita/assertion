"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AssertionError = /** @class */ (function () {
    function AssertionError(_a) {
        var message = _a.message, expected = _a.expected, actual = _a.actual;
        this.name = "AssertionError";
        this.message = message;
        this.actual = actual;
        this.expected = expected;
        Error.captureStackTrace(this, AssertionError);
    }
    AssertionError.prototype.toString = function () {
        return this.stack;
    };
    return AssertionError;
}());
exports.AssertionError = AssertionError;
