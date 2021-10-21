"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var emptyGymHash_js_1 = require("../display/emptyGymHash.js");
var Gym = /** @class */ (function () {
    function Gym() {
        this.hash = (0, emptyGymHash_js_1.default)();
    }
    Gym.prototype.placePlayer = function (player, symbol) {
        this.hash[player.coordinates.y][player.coordinates.x] = symbol;
    };
    Gym.prototype.placePlayers = function (user, badgers) {
        this.placeUser(user);
        this.placeBadgers(badgers);
    };
    Gym.prototype.placeUser = function (user) {
        if (!user.alive)
            this.placePlayer(user, '#');
        else
            this.placePlayer(user, '&');
    };
    Gym.prototype.placeBadgers = function (badgers) {
        var _this = this;
        badgers.current().forEach(function (b) {
            if (!b.alive)
                _this.placePlayer(b, '#');
            else
                _this.placePlayer(b, '%');
        });
    };
    Gym.prototype.placeShot = function (shot) {
        if (!shot.isNew && shot.isShooting) {
            this.placePlayer(shot, '*');
        }
        else if (!shot.isNew && !shot.isShooting) {
            this.placePlayer(shot, '.');
        }
    };
    Gym.prototype.placeShots = function (shots) {
        var _this = this;
        shots.forEach(function (shot) {
            _this.placeShot(shot);
        });
    };
    Gym.prototype.placeGrenade = function (grenade) {
        this.placePlayer(grenade, '@');
    };
    Gym.prototype.placeGrenades = function (grenades) {
        for (var _i = 0, grenades_1 = grenades; _i < grenades_1.length; _i++) {
            var grenade = grenades_1[_i];
            if (grenade.blast === 1)
                this.placeFirstBlast(grenade);
            else if (grenade.blast === 2)
                this.placeSecondBlast(grenade);
            else if (grenade.blast === 3)
                this.placeThirdBlast(grenade);
            else
                this.placeGrenade(grenade);
        }
    };
    Gym.prototype.placeFirstBlast = function (grenade) {
        this.placePlayer(grenade, '*');
    };
    Gym.prototype.placeSecondBlast = function (grenade) {
        var _this = this;
        grenade.secondBlastCoordinates.forEach(function (c) {
            _this.hash[c.y][c.x] = '*';
        });
    };
    Gym.prototype.placeThirdBlast = function (grenade) {
        var _this = this;
        this.placeSecondBlast(grenade);
        grenade.thirdNoInvisibleCoordinates.forEach(function (c) {
            _this.hash[c.y][c.x] = '*';
        });
    };
    return Gym;
}());
exports.default = Gym;
