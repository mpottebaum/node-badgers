"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var badger_js_1 = require("./badger.js");
var distanceBetween_js_1 = require("../helpers/distanceBetween.js");
var shuffle_js_1 = require("../helpers/shuffle.js");
var badgerNames = [
    "Balthazar",
    "Betelguese",
    "Bartholomew",
    "Balzac",
    "Blastus",
    "Bartleby",
    "Bloom",
    "Blackbeard",
    "Barnabas",
    "Beelzebub",
    "Baal",
    "Baladan",
    "Beeroth",
    "Behemoth",
    "Benjamin",
    "Bernice",
    "Bezek",
    "Buz",
    "Boanerges",
    "Boson",
];
var Badgers = /** @class */ (function () {
    function Badgers(numBadgers) {
        var _this = this;
        this.generateBadgers = function (numBadgers) {
            var names = (0, shuffle_js_1.default)(badgerNames).slice(0, numBadgers);
            return names.map(function (name) {
                var badger = new badger_js_1.default(name);
                badger.startCoordinates();
                badger.alive = true;
                return badger;
            });
        };
        this.current = function () { return _this.badgers.filter(function (b) { return !b.deleted; }); };
        this.alive = function () { return _this.badgers.filter(function (b) { return b.alive; }); };
        this.dead = function () { return _this.badgers.filter(function (b) { return !b.alive && !b.deleted; }); };
        this.killerBadger = function () { return _this.badgers.find(function (b) { return b.killer; }); };
        this.makeMoves = function (user) {
            _this.alive().forEach(function (b) {
                if ((0, distanceBetween_js_1.distanceBetween)(user, b) < 4) {
                    b.coordinates.y = user.coordinates.y;
                    b.coordinates.x = user.coordinates.x;
                    b.killer = true;
                }
                else {
                    b.move(user);
                    // (POSSIBLY NO SCENARIO WHERE THE BELOW WOULD BE TRUTHY)
                    // if(b.coordinates.y === user.coordinates.y && b.coordinates.x === user.coordinates.x) {
                    //     b.killer = true
                    // }
                }
            });
        };
        this.currentBadgersCoordinates = function () {
            return _this.current().map(function (b) { return b.coordinates; });
        };
        this.removeDead = function () {
            _this.current().forEach(function (b) {
                if (!b.alive) {
                    b.delete();
                }
            });
        };
        this.killBadgersInBlast = function (grenade) {
            var deadBadgers = [];
            _this.current().forEach(function (b) {
                if (b.isInBlast(grenade)) {
                    b.alive = false;
                    deadBadgers.push(b);
                }
            });
            return deadBadgers.length > 0 && deadBadgers;
        };
        this.badgers = this.generateBadgers(numBadgers);
    }
    return Badgers;
}());
exports.default = Badgers;
