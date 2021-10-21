"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var movement_js_1 = require("./movement.js");
var distanceBetween_js_1 = require("../helpers/distanceBetween.js");
var Badger = /** @class */ (function (_super) {
    __extends(Badger, _super);
    function Badger(name) {
        var _this = _super.call(this, 10, 10) || this;
        _this.isInBlast = function (grenade) {
            return grenade.thirdBlastCoordinates.some(function (c) { return c.x === _this.coordinates.x && c.y === _this.coordinates.y; }) ||
                grenade.secondBlastCoordinates.some(function (c) { return c.x === _this.coordinates.x && c.y === _this.coordinates.y; });
        };
        _this.name = name;
        _this.pace = 2;
        _this.alive = true;
        return _this;
    }
    Badger.prototype.move = function (user) {
        var y = (0, distanceBetween_js_1.yDistanceBetween)(user, this);
        var x = (0, distanceBetween_js_1.xDistanceBetween)(user, this);
        if (y === 0) {
            if (x > 0)
                this.moveLeft(this.pace);
            else
                this.moveRight(this.pace);
        }
        else if (x === 0) {
            if (y > 0)
                this.moveUp(this.pace);
            else
                this.moveDown(this.pace);
        }
        else if (y < 0 && x < 0) {
            for (var i = 0; i < this.pace; i++)
                this.move135();
        }
        else if (y < 0 && x > 0) {
            for (var i = 0; i < this.pace; i++)
                this.move225();
        }
        else if (y > 0 && x < 0) {
            for (var i = 0; i < this.pace; i++)
                this.move45();
        }
        else {
            for (var i = 0; i < this.pace; i++)
                this.move315();
        }
    };
    Badger.prototype.kill = function () {
        this.alive = false;
    };
    Badger.prototype.delete = function () {
        this.deleted = true;
    };
    Badger.prototype.startCoordinates = function () {
        var y = Math.round(Math.random() * 12);
        var x = Math.ceil(Math.random() * 40);
        this.coordinates = { x: x, y: y, };
    };
    return Badger;
}(movement_js_1.default));
exports.default = Badger;
