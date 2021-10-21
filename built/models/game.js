"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Game = /** @class */ (function () {
    function Game(numBadgers) {
        this.score = 0;
        this.lost = false;
        this.turn = 0;
        this.numBadgers = numBadgers;
    }
    Game.prototype.incTurn = function () {
        this.turn++;
    };
    Game.prototype.incBadgers = function () {
        this.numBadgers++;
    };
    Game.prototype.start = function () {
        this.turn = 0;
    };
    Game.prototype.gameOver = function () {
        this.lost = true;
    };
    return Game;
}());
exports.default = Game;
