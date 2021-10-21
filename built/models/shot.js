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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var movement_js_1 = require("./movement.js");
var emptyGymHash_js_1 = require("../display/emptyGymHash.js");
var Shot = /** @class */ (function (_super) {
    __extends(Shot, _super);
    function Shot(angle) {
        var _this = _super.call(this, 0, 0) || this;
        _this.startCoordinates = function (userCoordinates) {
            var y = userCoordinates.y, x = userCoordinates.x;
            switch (_this.angle) {
                case 0:
                    y -= 1;
                    break;
                case 90:
                    x += 1;
                    break;
                case 180:
                    y += 1;
                    break;
                case 270:
                    x -= 1;
                    break;
            }
            _this.coordinates = { y: y, x: x };
        };
        _this.isNew = true;
        _this.deadBadgers = [];
        _this.angle = angle;
        return _this;
    }
    Shot.prototype.shoot = function (user, startTurn) {
        this.startCoordinates(user.coordinates);
        this.moveTurns = {
            start: startTurn,
        },
            this.isShooting = true;
        this.isMoving = true;
        this.isNew = false;
    };
    Shot.prototype.moveShot = function (turn, badgers) {
        var start = this.moveTurns.start;
        if (turn === start) {
            return;
        }
        if (turn === start + 1) {
            this.isShooting = false;
        }
        if (!this.moveTurns.end) {
            if (this.angle === 0)
                this.coordinates.y -= 1;
            else if (this.angle === 90)
                this.coordinates.x += 1;
            else if (this.angle === 180)
                this.coordinates.y += 1;
            else if (this.angle === 270)
                this.coordinates.x -= 1;
            if (this.coordinates.y < emptyGymHash_js_1.yMin || this.coordinates.y > emptyGymHash_js_1.yMax || this.coordinates.x < emptyGymHash_js_1.xMin || this.coordinates.x > emptyGymHash_js_1.xMax) {
                this.isMoving = false;
                this.moveTurns = __assign(__assign({}, this.moveTurns), { dead: turn, end: turn + 10 });
            }
            else {
                this.killHits(badgers);
            }
        }
        else {
            if (turn === this.moveTurns.end) {
                this.deadBadgers.forEach(function (badger) {
                    badger.delete();
                });
                this.deleted = true;
            }
        }
    };
    Shot.prototype.killHits = function (badgers) {
        var _this = this;
        badgers.current().forEach(function (badger) {
            var _a = badger.coordinates, y = _a.y, x = _a.x;
            if ((y === _this.coordinates.y) && (x === _this.coordinates.x)) {
                badger.alive = false;
                _this.deadBadgers.push(badger);
            }
        });
    };
    return Shot;
}(movement_js_1.default));
exports.default = Shot;
