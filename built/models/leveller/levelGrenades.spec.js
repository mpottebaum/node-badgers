"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var levelGrenades_js_1 = require("./levelGrenades.js");
var user_js_1 = require("../user.js");
var badgers_js_1 = require("../badgers.js");
describe('LevelGrenades model', function () {
    it('should know if it has active grenades', function () {
        var levelGrenades = new levelGrenades_js_1.default();
        expect(levelGrenades.hasActiveGrenades()).toBeFalsy();
        levelGrenades.createGrenade(0);
        expect(levelGrenades.hasActiveGrenades()).toBeTruthy();
    });
    it('should return all active grenades', function () {
        var levelGrenades = new levelGrenades_js_1.default();
        expect(levelGrenades.activeGrenades()).toHaveLength(0);
        levelGrenades.createGrenade(0);
        expect(levelGrenades.activeGrenades()).toHaveLength(1);
    });
    it('should process grenades based on move turns/blast status', function () {
        var numBadgers = 2;
        var turn = 1;
        var user = new user_js_1.default(numBadgers);
        var startGrenades = user.grenades;
        var badgers = new badgers_js_1.default(numBadgers);
        var levelGrenades = new levelGrenades_js_1.default();
        levelGrenades.currentDeadCount = 0;
        levelGrenades.createGrenade(0);
        var grenade = levelGrenades.grenades[0];
        levelGrenades.processGrenades(user, badgers, turn);
        expect(grenade.isNew()).toBeFalsy();
        expect(user.grenades).toBe(startGrenades - 1);
        var _a = grenade.coordinates, x = _a.x, y = _a.y;
        var startCoordinates = { x: x, y: y };
        turn += 3;
        levelGrenades.processGrenades(user, badgers, turn);
        expect(grenade.coordinates.y).toBe(startCoordinates.y - 1);
        turn += 3;
        levelGrenades.processGrenades(user, badgers, turn);
        expect(grenade.coordinates.y).toBe(startCoordinates.y - 2);
        turn += 3;
        levelGrenades.processGrenades(user, badgers, turn);
        expect(grenade.coordinates.y).toBe(startCoordinates.y - 3);
        turn += 3;
        levelGrenades.processGrenades(user, badgers, turn);
        expect(grenade.blast).toBe(1);
        expect(grenade.coordinates.y).toBe(startCoordinates.y - 3);
        turn += 2;
        levelGrenades.processGrenades(user, badgers, turn);
        expect(grenade.blast).toBe(2);
        expect(grenade.secondBlastCoordinates).toBeTruthy();
        expect(grenade.coordinates.y).toBe(startCoordinates.y - 3);
        turn += 2;
        levelGrenades.processGrenades(user, badgers, turn);
        expect(grenade.blast).toBe(3);
        expect(grenade.thirdBlastCoordinates).toBeTruthy();
        expect(grenade.coordinates.y).toBe(startCoordinates.y - 3);
    });
    it('should return unexploded grenades or false', function () {
        var levelGrenades = new levelGrenades_js_1.default();
        expect(levelGrenades.unexplodedGrenades()).toBeFalsy();
        levelGrenades.createGrenade(0);
        expect(levelGrenades.unexplodedGrenades()).toHaveLength(1);
    });
    it('should update current dead count if there are dead', function () {
        var numBadgers = 1;
        var turn = 1;
        var user = new user_js_1.default(numBadgers);
        var badgers = new badgers_js_1.default(numBadgers);
        badgers.current()[0].coordinates = user.coordinates;
        var levelGrenades = new levelGrenades_js_1.default();
        levelGrenades.currentDeadCount = 0;
        levelGrenades.createGrenade(0);
        var grenade = levelGrenades.grenades[0];
        grenade.start(user.coordinates, turn);
        grenade.setSecondBlast();
        grenade.setThirdBlast();
        turn = grenade.moveTurns.thirdBlast;
        levelGrenades.killPlayersGrenades(user, badgers, turn);
        expect(levelGrenades.currentDeadCount).toBe(1);
        expect(levelGrenades.endTurnCurrentDead).toBe(turn + 15);
    });
    it('should award user points on grenade kill', function () {
        var numBadgers = 1;
        var turn = 1;
        var user = new user_js_1.default(numBadgers);
        var badgers = new badgers_js_1.default(numBadgers);
        badgers.current()[0].coordinates = user.coordinates;
        var levelGrenades = new levelGrenades_js_1.default();
        levelGrenades.currentDeadCount = 0;
        levelGrenades.createGrenade(0);
        var grenade = levelGrenades.grenades[0];
        grenade.start(user.coordinates, turn);
        grenade.setSecondBlast();
        grenade.setThirdBlast();
        turn = grenade.moveTurns.thirdBlast;
        levelGrenades.killPlayersGrenades(user, badgers, turn);
        turn = grenade.moveTurns.dead;
        levelGrenades.grenadeCleanUp(user, badgers, turn);
        expect(user.points).toBeGreaterThan(0);
    });
    it('should delete dead badgers after grenade end', function () {
        var numBadgers = 1;
        var turn = 1;
        var user = new user_js_1.default(numBadgers);
        var badgers = new badgers_js_1.default(numBadgers);
        var badger = badgers.current()[0];
        badger.coordinates = user.coordinates;
        var levelGrenades = new levelGrenades_js_1.default();
        levelGrenades.currentDeadCount = 0;
        levelGrenades.createGrenade(0);
        var grenade = levelGrenades.grenades[0];
        grenade.start(user.coordinates, turn);
        grenade.setSecondBlast();
        grenade.setThirdBlast();
        turn = grenade.moveTurns.thirdBlast;
        levelGrenades.killPlayersGrenades(user, badgers, turn);
        turn = grenade.moveTurns.end;
        levelGrenades.grenadeCleanUp(user, badgers, turn);
        expect(badger.deleted).toBeTruthy();
    });
    it('should know if it has miss grenades', function () {
        var levelGrenades = new levelGrenades_js_1.default();
        levelGrenades.createGrenade(0);
        var grenade = levelGrenades.grenades[0];
        grenade.isExploded = true;
        expect(levelGrenades.hasMissGrenades()).toBeTruthy();
    });
    it('should return hit grenades or false', function () {
        var levelGrenades = new levelGrenades_js_1.default();
        levelGrenades.createGrenade(0);
        var grenade = levelGrenades.grenades[0];
        grenade.isExploded = true;
        expect(levelGrenades.hitGrenades()).toBeFalsy();
        grenade.deadBadgers = [{}];
        expect(levelGrenades.hitGrenades()).toHaveLength(1);
    });
});