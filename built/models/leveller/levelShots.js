"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var shot_js_1 = require("../shot.js");
var LevelShots = /** @class */ (function () {
    function LevelShots() {
        this.shots = [];
    }
    LevelShots.prototype.hasActiveShots = function () {
        return this.shots.some(function (s) { return !s.deleted; });
    };
    LevelShots.prototype.activeShots = function () {
        return this.shots.filter(function (s) { return !s.deleted; });
    };
    LevelShots.prototype.createShot = function (angle) {
        var newShot = new shot_js_1.default(angle);
        this.shots.push(newShot);
    };
    LevelShots.prototype.processShots = function (user, badgers, turn) {
        var _this = this;
        if (this.hasActiveShots()) {
            if (this.newShots()) {
                this.newShots().forEach(function (shot) {
                    shot.shoot(user, turn);
                    user.shoot();
                });
            }
            this.activeShots().forEach(function (shot) {
                shot.moveShot(turn, badgers);
            });
            if (this.shotsAtDeadTurn(turn)) {
                this.shotsAtDeadTurn(turn).forEach(function (shot) {
                    if (shot.deadBadgers.length > 0) {
                        shot.deadBadgers.forEach(function () { return user.shootBadgerPoints(); });
                        _this.currentDeadCount += shot.deadBadgers.length;
                        _this.endTurnCurrentDead = turn + 15;
                    }
                });
            }
        }
    };
    LevelShots.prototype.newShots = function () {
        var newShots = this.shots.filter(function (s) { return s.isNew; });
        return newShots.length > 0 && newShots;
    };
    LevelShots.prototype.shotsAtDeadTurn = function (turn) {
        var shots = this.activeShots().filter(function (s) { return (s.moveTurns && s.moveTurns.dead) && (s.moveTurns.dead === turn); });
        return shots.length > 0 && shots;
    };
    LevelShots.prototype.shootingShots = function () {
        var shootingShots = this.activeShots().filter(function (s) { return s.isShooting; });
        return shootingShots.length > 0 && shootingShots;
    };
    LevelShots.prototype.movingShots = function () {
        var movingShots = this.activeShots().filter(function (s) { return s.isMoving; });
        return movingShots.length > 0 && movingShots;
    };
    LevelShots.prototype.hitShots = function () {
        var hitShots = this.activeShots().filter(function (shot) { return shot.deadBadgers.length > 0; });
        return hitShots.length > 0 && hitShots;
    };
    LevelShots.prototype.hasMissShots = function () {
        return this.activeShots().some(function (shot) { return (shot.moveTurns && shot.moveTurns.dead) && (shot.deadBadgers.length === 0); });
    };
    return LevelShots;
}());
exports.default = LevelShots;
