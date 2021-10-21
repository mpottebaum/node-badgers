"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var badgers_js_1 = require("./badgers.js");
var user_js_1 = require("./user.js");
var grenade_js_1 = require("./grenade.js");
describe('Badgers model', function () {
    it('should generate given number of badgers when initialized', function () {
        var badgers = new badgers_js_1.default(2);
        expect(badgers.badgers.length).toBe(2);
    });
    it('should return dead badgers that are not deleted', function () {
        var badgers = new badgers_js_1.default(3);
        var deadBadger = badgers.current()[0];
        var deletedBadger = badgers.current()[1];
        deadBadger.alive = false;
        deletedBadger.alive = false;
        deletedBadger.deleted = true;
        expect(badgers.dead()).toHaveLength(1);
    });
    it('should mark badger as killer when near user before moves', function () {
        var numBadgers = 2;
        var badgers = new badgers_js_1.default(numBadgers);
        var user = new user_js_1.default(numBadgers);
        var killerBadger = badgers.current()[0];
        killerBadger.coordinates = {
            y: user.coordinates.y + 1,
            x: user.coordinates.x,
        };
        badgers.makeMoves(user);
        expect(killerBadger.killer).toBeTruthy();
    });
    it('should return an array of only the current badger coordinates', function () {
        var badgers = new badgers_js_1.default(3);
        badgers.current()[0].deleted = true;
        expect(badgers.currentBadgersCoordinates()).toHaveLength(2);
        expect(badgers.currentBadgersCoordinates()[0].x).toBeTruthy();
    });
    it('should mark dead badgers as deleted', function () {
        var badgers = new badgers_js_1.default(3);
        var deadBadger = badgers.current()[0];
        deadBadger.alive = false;
        badgers.removeDead();
        expect(deadBadger.deleted).toBeTruthy();
    });
    it('should kill badgers in grenade blast', function () {
        var badgers = new badgers_js_1.default(1);
        var badger = badgers.current()[0];
        badger.coordinates = { y: 12, x: 24 };
        var grenade = new grenade_js_1.default(0, 2);
        grenade.start(badger.coordinates, 1);
        grenade.setSecondBlast();
        grenade.setThirdBlast();
        var deadBadgers = badgers.killBadgersInBlast(grenade);
        expect(badger.alive).toBeFalsy();
        expect(deadBadgers).toHaveLength(1);
    });
    it('should not kill badgers not in grenade blast', function () {
        var numBadgers = 1;
        var badgers = new badgers_js_1.default(numBadgers);
        var badger = badgers.current()[0];
        var user = new user_js_1.default(numBadgers);
        var grenade = new grenade_js_1.default(0, 2);
        grenade.start(user.coordinates, 1);
        grenade.setSecondBlast();
        grenade.setThirdBlast();
        var deadBadgers = badgers.killBadgersInBlast(grenade);
        expect(badger.alive).toBeTruthy();
        expect(deadBadgers).toBeFalsy();
    });
});
