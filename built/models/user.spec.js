"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var user_js_1 = require("./user.js");
var grenade_js_1 = require("./grenade.js");
describe('User model', function () {
    it('should change weapon', function () {
        var user = new user_js_1.default(2);
        user.changeWeapon('gun');
        expect(user.weapon).toBe('gun');
    });
    it('should decrease bullet count on shot', function () {
        var user = new user_js_1.default(2);
        var startBullets = user.bullets;
        user.shoot();
        expect(user.bullets).toBe(startBullets - 1);
    });
    it('should kill user if in grenade blast', function () {
        var user = new user_js_1.default(2);
        var grenade = new grenade_js_1.default(0, 2);
        grenade.start(user.coordinates, 1);
        grenade.setSecondBlast();
        grenade.setThirdBlast();
        user.killIfInBlast(grenade);
        expect(user.alive).toBeFalsy();
    });
    it('should not kill user if not in grenade blast', function () {
        var user = new user_js_1.default(2);
        var grenade = new grenade_js_1.default(0, 2);
        grenade.start(user.coordinates, 1);
        grenade.fullMovement();
        grenade.fullMovement();
        grenade.fullMovement();
        grenade.setSecondBlast();
        grenade.setThirdBlast();
        user.killIfInBlast(grenade);
        expect(user.alive).toBeTruthy();
    });
    it('should award points on shot kill', function () {
        var user = new user_js_1.default(2);
        user.shootBadgerPoints();
        expect(user.points).toBe(300);
    });
    it('should award points on grenade kill', function () {
        var user = new user_js_1.default(2);
        user.grenadeKillBadgerPoints(2);
        expect(user.points).toBe(1200);
    });
    it('should award points on level survival', function () {
        var user = new user_js_1.default(2);
        var bullets = user.bullets;
        var grenades = user.grenades;
        user.survivalPoints(2);
        var points = 2000 + (bullets * 50) + (grenades * 500);
        expect(user.points).toBe(points);
    });
});
