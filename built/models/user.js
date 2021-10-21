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
var emptyGymHash_js_1 = require("../display/emptyGymHash.js");
var User = /** @class */ (function (_super) {
    __extends(User, _super);
    function User(numBadgers) {
        var _this = _super.call(this, emptyGymHash_js_1.yMax, emptyGymHash_js_1.xMax / 2) || this;
        _this.bullets = Math.ceil(Math.sqrt(numBadgers));
        _this.grenades = Math.ceil(Math.log(numBadgers)) + 2;
        _this.stamina = 3;
        _this.tired = false;
        _this.alive = true;
        _this.win = false;
        _this.points = 0;
        _this.weapon = 'grenade';
        return _this;
    }
    User.prototype.changeWeapon = function (weapon) {
        this.weapon = weapon;
    };
    User.prototype.shoot = function () {
        this.bullets -= 1;
    };
    User.prototype.killIfInBlast = function (grenade) {
        var _this = this;
        var checkForCoordinateMatch = function (coordinateList) {
            return coordinateList.some(function (c) { return c.x === _this.coordinates.x && c.y === _this.coordinates.y; });
        };
        if (checkForCoordinateMatch(grenade.thirdBlastCoordinates) || checkForCoordinateMatch(grenade.secondBlastCoordinates)) {
            return this.alive = false;
        }
        return true;
    };
    User.prototype.shootBadgerPoints = function () {
        this.points += 300;
    };
    User.prototype.grenadeKillBadgerPoints = function (numBadgers) {
        this.points += (300 * (Math.pow(numBadgers, numBadgers)));
    };
    User.prototype.survivalPoints = function (numBadgers) {
        this.points += (1000 * numBadgers);
        this.points += (50 * this.bullets);
        this.points += (500 * this.grenades);
    };
    return User;
}(movement_js_1.default));
exports.default = User;
