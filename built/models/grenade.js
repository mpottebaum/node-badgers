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
var grenStartCs = {
    y: 0,
    x: 0,
};
var Grenade = /** @class */ (function (_super) {
    __extends(Grenade, _super);
    function Grenade(angle, power) {
        var _this = _super.call(this, grenStartCs.y, grenStartCs.x) || this;
        _this.isNew = function () {
            return !_this.moveTurns;
        };
        _this.startCoordinates = function (userCoordinates) {
            var y = userCoordinates.y, x = userCoordinates.x;
            if ([315, 0, 45].includes(_this.angle)) {
                y -= 1;
            }
            else if ([225, 180, 135].includes(_this.angle)) {
                y += 1;
            }
            else if (_this.angle === 270) {
                x -= 1;
            }
            else {
                x += 1;
            }
            _this.coordinates = { y: y, x: x };
        };
        _this.start = function (userCoordinates, startTurn) {
            _this.startCoordinates(userCoordinates);
            _this.moveTurns = {
                start: startTurn,
                first: startTurn + 3,
                second: startTurn + 6,
                third: startTurn + 9,
                firstBlast: startTurn + 12,
                secondBlast: startTurn + 14,
                thirdBlast: startTurn + 16,
                dead: startTurn + 26,
                end: startTurn + 41,
            };
        };
        _this.setFirstBlast = function () {
            _this.blast = 1;
        };
        _this.setSecondBlast = function () {
            _this.blast = 2;
            var _a = _this.coordinates, y = _a.y, x = _a.x;
            var yCs = [y, y + 1, y - 1];
            var xCs1 = [x, x + 1, x - 1];
            var xCs2 = [x + 2, x - 2];
            var blast = [];
            xCs1.forEach(function (xC) {
                yCs.forEach(function (yC) { return blast.push({ y: yC, x: xC }); });
            });
            xCs2.forEach(function (xC) { return blast.push({ y: y, x: xC }); });
            _this.secondBlastCoordinates = blast.filter(function (c) {
                return c.y >= 0 && c.y <= emptyGymHash_js_1.yMax && c.x > 0 && c.x <= emptyGymHash_js_1.xMax;
            });
        };
        _this.setThirdBlast = function () {
            _this.blast = 3;
            var _a = _this.coordinates, y = _a.y, x = _a.x;
            var yCs2 = [y + 1, y - 1];
            var yCs3 = [y + 2, y - 2];
            var xCs1 = [x + 3, x - 3];
            var xCs2 = [x + 2, x - 2];
            var xCs3 = [x, x + 1, x - 1];
            var blast = [];
            xCs1.forEach(function (xC) { return blast.push({ y: y, x: xC }); });
            xCs2.forEach(function (xC) {
                yCs2.forEach(function (yC) { return blast.push({ y: yC, x: xC }); });
            });
            xCs3.forEach(function (xC) {
                yCs3.forEach(function (yC) { return blast.push({ y: yC, x: xC }); });
            });
            xCs1.forEach(function (xC) {
                yCs3.forEach(function (yC) { return blast.push({ y: yC, x: xC }); });
            });
            xCs1.forEach(function (xC) {
                yCs2.forEach(function (yC) { return blast.push({ y: yC, x: xC }); });
            });
            xCs2.forEach(function (xC) {
                yCs3.forEach(function (yC) { return blast.push({ y: yC, x: xC }); });
            });
            var minusOutOfBounds = blast.filter(function (c) {
                return c.y >= 0 && c.y <= emptyGymHash_js_1.yMax && c.x > 0 && c.x <= emptyGymHash_js_1.xMax;
            });
            _this.thirdBlastCoordinates = minusOutOfBounds;
            _this.thirdNoInvisibleCoordinates = minusOutOfBounds.filter(function (c) {
                return (!([(y + 1), (y - 1)].includes(c.y) && [(x + 3), (x - 3)].includes(c.x)) &&
                    !([(y + 2), (y - 2)].includes(c.y) && [(x + 2), (x - 2)].includes(c.x)));
            });
        };
        _this.checkAngleAndAdjust = function () {
            switch (_this.angle) {
                case 0:
                    if (_this.coordinates.y === emptyGymHash_js_1.yMin) {
                        _this.angle = 180;
                    }
                    break;
                case 45:
                    if (_this.coordinates.y === emptyGymHash_js_1.yMin && _this.coordinates.x === emptyGymHash_js_1.xMax) {
                        _this.angle = 225;
                    }
                    else if (_this.coordinates.y === emptyGymHash_js_1.yMin) {
                        _this.angle = 135;
                    }
                    else if (_this.coordinates.x === emptyGymHash_js_1.xMax) {
                        _this.angle = 315;
                    }
                    break;
                case 90:
                    if (_this.coordinates.x === emptyGymHash_js_1.xMax) {
                        _this.angle = 270;
                    }
                    break;
                case 135:
                    if (_this.coordinates.y == emptyGymHash_js_1.yMax && _this.coordinates.x == emptyGymHash_js_1.xMax) {
                        _this.angle = 315;
                    }
                    else if (_this.coordinates.y == emptyGymHash_js_1.yMax) {
                        _this.angle = 45;
                    }
                    else if (_this.coordinates.x == emptyGymHash_js_1.xMax) {
                        _this.angle = 225;
                    }
                    break;
                case 180:
                    if (_this.coordinates.y === emptyGymHash_js_1.yMax) {
                        _this.angle = 0;
                    }
                    break;
                case 225:
                    if (_this.coordinates.y === emptyGymHash_js_1.yMax && _this.coordinates.x === emptyGymHash_js_1.xMin) {
                        _this.angle = 45;
                    }
                    else if (_this.coordinates.y === emptyGymHash_js_1.yMax) {
                        _this.angle = 315;
                    }
                    else if (_this.coordinates.x === emptyGymHash_js_1.xMin) {
                        _this.angle = 135;
                    }
                    break;
                case 270:
                    if (_this.coordinates.x < emptyGymHash_js_1.xMin + 2) {
                        _this.angle = 90;
                    }
                    break;
                case 315:
                    if (_this.coordinates.y === emptyGymHash_js_1.yMin && _this.coordinates.x === emptyGymHash_js_1.xMin) {
                        _this.angle = 135;
                    }
                    else if (_this.coordinates.y === emptyGymHash_js_1.yMin) {
                        _this.angle = 225;
                    }
                    else if (_this.coordinates.x === emptyGymHash_js_1.xMin) {
                        _this.angle = 45;
                    }
                    break;
            }
        };
        _this.singleMovement = function () {
            _this.checkAngleAndAdjust();
            switch (_this.angle) {
                case 0:
                    _this.moveUp(1);
                    break;
                case 45:
                    _this.move45();
                    break;
                case 90:
                    _this.moveRight(1);
                    break;
                case 135:
                    _this.move135();
                    break;
                case 180:
                    _this.moveDown(1);
                    break;
                case 225:
                    _this.move225();
                    break;
                case 270:
                    _this.moveLeft(1);
                    break;
                case 315:
                    _this.move315();
                    break;
            }
        };
        _this.fullMovement = function () {
            for (var i = 0; i < _this.power; i++)
                _this.singleMovement();
        };
        _this.killPlayersInBlastRadius = function (user, badgers) {
            var userIsAlive = user.killIfInBlast(_this);
            _this.suicide = !userIsAlive;
            _this.deadBadgers = badgers.killBadgersInBlast(_this);
        };
        _this.angle = angle;
        _this.power = power;
        _this.isExploded = false;
        _this.blast = 0;
        return _this;
    }
    Grenade.prototype.moveGrenade = function (turn) {
        var _a = this.moveTurns, first = _a.first, second = _a.second, third = _a.third, firstBlast = _a.firstBlast, secondBlast = _a.secondBlast, thirdBlast = _a.thirdBlast, dead = _a.dead, end = _a.end;
        switch (turn) {
            case first:
                this.fullMovement();
                break;
            case second:
                this.fullMovement();
                break;
            case third:
                this.fullMovement();
                break;
            case firstBlast:
                this.setFirstBlast();
                break;
            case secondBlast:
                this.setSecondBlast();
                break;
            case thirdBlast:
                this.setThirdBlast();
                break;
            case dead:
                this.blast = null;
                this.isExploded = true;
                break;
            case end:
                this.deleted = true;
                break;
        }
    };
    Grenade.prototype.hasDead = function () {
        return this.deadBadgers && this.deadBadgers.length > 0;
    };
    return Grenade;
}(movement_js_1.default));
exports.default = Grenade;
