"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.distanceBetween = exports.xDistanceBetween = exports.yDistanceBetween = void 0;
var yDistanceBetween = function (user, badger) { return badger.coordinates.y - user.coordinates.y; };
exports.yDistanceBetween = yDistanceBetween;
var xDistanceBetween = function (user, badger) { return (badger.coordinates.x - user.coordinates.x) * 2; };
exports.xDistanceBetween = xDistanceBetween;
var distanceBetween = function (user, badger) {
    var yLength = Math.abs((0, exports.yDistanceBetween)(user, badger));
    var xLength = Math.abs((0, exports.xDistanceBetween)(user, badger));
    return Math.sqrt(Math.pow(yLength, 2) + Math.pow(xLength, 2));
};
exports.distanceBetween = distanceBetween;
