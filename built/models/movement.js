"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var emptyGymHash_js_1 = require("../display/emptyGymHash.js");
var Movement = /** @class */ (function () {
    function Movement(y, x) {
        this.coordinates = { y: y, x: x };
    }
    Movement.prototype.moveUp = function (numSpaces) {
        if ((this.coordinates.y - numSpaces) < emptyGymHash_js_1.yMin) {
            this.coordinates.y = emptyGymHash_js_1.yMin;
        }
        else {
            this.coordinates.y -= numSpaces;
        }
    };
    Movement.prototype.moveDown = function (numSpaces) {
        if ((this.coordinates.y + numSpaces) > emptyGymHash_js_1.yMax) {
            this.coordinates.y = emptyGymHash_js_1.yMax;
        }
        else {
            this.coordinates.y += numSpaces;
        }
    };
    Movement.prototype.moveLeft = function (numSpaces) {
        if ((this.coordinates.x - (numSpaces * 2)) < emptyGymHash_js_1.xMin) {
            this.coordinates.x = emptyGymHash_js_1.xMin;
        }
        else {
            this.coordinates.x -= numSpaces * 2;
        }
    };
    Movement.prototype.moveRight = function (numSpaces) {
        if ((this.coordinates.x + (numSpaces * 2)) > emptyGymHash_js_1.xMax) {
            this.coordinates.x = emptyGymHash_js_1.xMax;
        }
        else {
            this.coordinates.x += numSpaces * 2;
        }
    };
    Movement.prototype.move45 = function () {
        this.moveUp(1);
        this.moveRight(0.5);
    };
    Movement.prototype.move135 = function () {
        this.moveDown(1);
        this.moveRight(0.5);
    };
    Movement.prototype.move225 = function () {
        this.moveDown(1);
        this.moveLeft(0.5);
    };
    Movement.prototype.move315 = function () {
        this.moveUp(1);
        this.moveLeft(0.5);
    };
    return Movement;
}());
exports.default = Movement;
