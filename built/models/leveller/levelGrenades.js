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
var levelShots_js_1 = require("./levelShots.js");
var grenade_js_1 = require("../grenade.js");
var LevelGrenades = /** @class */ (function (_super) {
    __extends(LevelGrenades, _super);
    function LevelGrenades() {
        var _this = _super.call(this) || this;
        _this.grenades = [];
        return _this;
    }
    LevelGrenades.prototype.createGrenade = function (angle) {
        var newGrenade = new grenade_js_1.default(angle, 1);
        this.grenades.push(newGrenade);
    };
    LevelGrenades.prototype.processGrenades = function (user, badgers, turn) {
        if (this.hasActiveGrenades()) {
            if (this.newGrenades()) {
                this.newGrenades().forEach(function () { return user.grenades -= 1; });
                this.startNewGrenades(user.coordinates, turn);
            }
            if (this.movingGrenades()) {
                this.grenadeCleanUp(user, badgers, turn);
            }
            this.moveGrenades(turn);
            if (this.hasActiveGrenades()) {
                this.killPlayersGrenades(user, badgers, turn);
            }
        }
    };
    LevelGrenades.prototype.hasActiveGrenades = function () {
        return this.grenades.some(function (g) { return !g.deleted; });
    };
    LevelGrenades.prototype.activeGrenades = function () {
        return this.grenades.filter(function (g) { return !g.deleted; });
    };
    LevelGrenades.prototype.newGrenades = function () {
        var newGrenades = this.activeGrenades().filter(function (g) { return g.isNew() && !g.deleted; });
        return newGrenades.length > 0 && newGrenades;
    };
    LevelGrenades.prototype.movingGrenades = function () {
        var moving = this.activeGrenades().filter(function (g) { return !g.deleted && g.moveTurns; });
        return moving.length > 0 && moving;
    };
    LevelGrenades.prototype.unexplodedGrenades = function () {
        var unexploded = this.activeGrenades().filter(function (g) { return !g.isExploded; });
        return unexploded.length > 0 && unexploded;
    };
    LevelGrenades.prototype.startNewGrenades = function (userCoordinates, turn) {
        for (var _i = 0, _a = this.activeGrenades(); _i < _a.length; _i++) {
            var grenade = _a[_i];
            if (grenade.isNew()) {
                grenade.start(userCoordinates, turn);
            }
        }
    };
    LevelGrenades.prototype.moveGrenades = function (turn) {
        var active = this.activeGrenades();
        for (var _i = 0, active_1 = active; _i < active_1.length; _i++) {
            var grenade = active_1[_i];
            grenade.moveGrenade(turn);
        }
    };
    LevelGrenades.prototype.killPlayersGrenades = function (user, badgers, turn) {
        for (var _i = 0, _a = this.activeGrenades(); _i < _a.length; _i++) {
            var grenade = _a[_i];
            if (grenade.moveTurns && (turn === grenade.moveTurns.thirdBlast)) {
                grenade.killPlayersInBlastRadius(user, badgers);
                if (grenade.deadBadgers.length > 0) {
                    this.currentDeadCount += grenade.deadBadgers.length;
                    this.endTurnCurrentDead = turn + 15;
                }
            }
        }
    };
    LevelGrenades.prototype.grenadeCleanUp = function (user, badgers, turn) {
        var moving = this.movingGrenades();
        for (var _i = 0, moving_1 = moving; _i < moving_1.length; _i++) {
            var grenade = moving_1[_i];
            var _a = grenade.moveTurns, dead = _a.dead, end = _a.end;
            if ((turn === dead) && (grenade.deadBadgers)) {
                user.grenadeKillBadgerPoints(badgers.dead().length);
            }
            if ((turn === end) && (grenade.deadBadgers && grenade.deadBadgers.length > 0)) {
                grenade.deadBadgers.forEach(function (b) { return b.delete(); });
            }
        }
    };
    LevelGrenades.prototype.hasMissGrenades = function () {
        return this.activeGrenades().some(function (g) { return g.isExploded && !g.deadBadgers; });
    };
    LevelGrenades.prototype.hitGrenades = function () {
        var hitGrenades = this.activeGrenades().filter(function (grenade) { return grenade.isExploded && (grenade.deadBadgers && grenade.deadBadgers.length > 0); });
        return hitGrenades.length > 0 && hitGrenades;
    };
    return LevelGrenades;
}(levelShots_js_1.default));
exports.default = LevelGrenades;
