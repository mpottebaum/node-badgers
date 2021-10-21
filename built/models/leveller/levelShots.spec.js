"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var levelShots_js_1 = require("./levelShots.js");
var user_js_1 = require("../user.js");
var badgers_js_1 = require("../badgers.js");
var emptyGymHash_js_1 = require("../../display/emptyGymHash.js");
describe('LevelShots model', function () {
    it('should know if it has active shots', function () {
        var levelShots = new levelShots_js_1.default();
        expect(levelShots.hasActiveShots()).toBeFalsy();
        levelShots.createShot(0);
        expect(levelShots.hasActiveShots()).toBeTruthy();
    });
    it('should return all active shots', function () {
        var levelShots = new levelShots_js_1.default();
        levelShots.createShot(0);
        expect(levelShots.activeShots()).toHaveLength(1);
    });
    it('should process all shots based on shooting/moving status', function () {
        var numBadgers = 2;
        var turn = 1;
        var user = new user_js_1.default(numBadgers);
        var startBullets = user.bullets;
        var badgers = new badgers_js_1.default(numBadgers);
        var levelShots = new levelShots_js_1.default();
        levelShots.currentDeadCount = 0;
        levelShots.createShot(0);
        var shot = levelShots.shots[0];
        levelShots.processShots(user, badgers, turn);
        expect(shot.isNew).toBeFalsy();
        expect(user.bullets).toBe(startBullets - 1);
        turn += 1;
        levelShots.processShots(user, badgers, turn);
        expect(shot.coordinates.y).toBe(user.coordinates.y - 2);
        shot.coordinates.y = emptyGymHash_js_1.yMin;
        shot.moveShot(turn, badgers);
        turn = shot.moveTurns.dead;
        levelShots.processShots(user, badgers, turn);
        expect(levelShots.currentDeadCount).toBe(0);
        var deadBadger = badgers.current()[0];
        deadBadger.alive = false;
        shot.deadBadgers.push(deadBadger);
        levelShots.processShots(user, badgers, turn);
        expect(levelShots.currentDeadCount).toBe(1);
        expect(levelShots.endTurnCurrentDead).toBe(turn + 15);
    });
    it('should return shooting shots or false', function () {
        var levelShots = new levelShots_js_1.default();
        levelShots.createShot(0);
        expect(levelShots.shootingShots()).toBeFalsy();
        levelShots.shots[0].isShooting = true;
        expect(levelShots.shootingShots()).toHaveLength(1);
    });
    it('should return moving shots or false', function () {
        var levelShots = new levelShots_js_1.default();
        levelShots.createShot(0);
        expect(levelShots.movingShots()).toBeFalsy();
        levelShots.shots[0].isMoving = true;
        expect(levelShots.movingShots()).toHaveLength(1);
    });
    it('should return hit shots or false', function () {
        var levelShots = new levelShots_js_1.default();
        levelShots.createShot(0);
        expect(levelShots.hitShots()).toBeFalsy();
        levelShots.shots[0].deadBadgers.push({});
        expect(levelShots.hitShots()).toHaveLength(1);
    });
    it('should know if it has miss shots', function () {
        var levelShots = new levelShots_js_1.default();
        levelShots.createShot(0);
        expect(levelShots.hasMissShots()).toBeFalsy();
        levelShots.shots[0].moveTurns = { dead: 10 };
        expect(levelShots.hasMissShots()).toBeTruthy();
    });
});
