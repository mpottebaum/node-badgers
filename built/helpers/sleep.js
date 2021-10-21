"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sleep = function (s) {
    return new Promise(function (resolve) {
        setTimeout(resolve, s * 1000);
    });
};
exports.default = sleep;
