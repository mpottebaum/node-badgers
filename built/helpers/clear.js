"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ansi_escapes_1 = require("ansi-escapes");
var clear = function () {
    process.stdin.write(ansi_escapes_1.default.clearScreen);
};
exports.default = clear;
