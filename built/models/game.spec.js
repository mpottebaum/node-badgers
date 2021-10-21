"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var game_js_1 = require("./game.js");
describe('Game model', function () {
    it('should increase turn number', function () {
        var game = new game_js_1.default(2);
        game.incTurn();
        expect(game.turn).toBe(1);
    });
    it('should increase badgers number', function () {
        var game = new game_js_1.default(2);
        game.incBadgers();
        expect(game.numBadgers).toBe(3);
    });
    it('should reset turn number on start', function () {
        var game = new game_js_1.default(2);
        game.turn = 45;
        game.start();
        expect(game.turn).toBe(0);
    });
    it('should lose on game over', function () {
        var game = new game_js_1.default(2);
        game.gameOver();
        expect(game.lost).toBeTruthy();
    });
});
