"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var gym_js_1 = require("../models/gym.js");
var displayGym_js_1 = require("./displayGym.js");
var userInfo = function (user) {
    console.log("WEAPON: " + user.weapon.toUpperCase());
    console.log("Stamina: " + user.stamina);
    console.log("Grenades: " + user.grenades);
    console.log("Bullets: " + user.bullets);
};
var displayDash = function (user, badgers, leveller) {
    var message = ' ';
    if (leveller.hasMissShots() || leveller.hasMissGrenades()) {
        message = 'You missed';
    }
    if (leveller.currentDeadCount === 1) {
        message = "You killed a badger!";
    }
    if (leveller.currentDeadCount > 1) {
        message = "You killed " + leveller.currentDeadCount + " badgers!";
    }
    if (leveller.activeGrenades().some(function (grenade) { return grenade.suicide; })) {
        console.log('You blew yourself up!');
        return;
    }
    if (badgers.killerBadger()) {
        console.log("The badger " + badgers.killerBadger().name + " killed you");
        return;
    }
    console.log(message);
    userInfo(user);
};
var frame = function (user, badgers, leveller, isWin) {
    if (isWin === void 0) { isWin = false; }
    var gym = new gym_js_1.default();
    if (isWin)
        gym.placeBadgers(badgers);
    else
        gym.placePlayers(user, badgers);
    if (leveller.unexplodedGrenades()) {
        gym.placeGrenades(leveller.unexplodedGrenades());
    }
    if (leveller.movingShots()) {
        gym.placeShots(leveller.movingShots());
    }
    console.log("LEVEL POINTS: " + user.points);
    if (isWin) {
        (0, displayGym_js_1.displayWinGym)(user, gym.hash);
        return;
    }
    (0, displayGym_js_1.displayGym)(gym.hash);
    displayDash(user, badgers, leveller);
};
exports.default = frame;
