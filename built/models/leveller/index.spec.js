"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_js_1 = require("./index.js");
var user_js_1 = require("../user.js");
var badgers_js_1 = require("../badgers.js");
describe('Leveller model', function () {
    it('should reset current dead count on end turn', function () {
        var numBadgers = 1;
        var user = new user_js_1.default(numBadgers);
        var badgers = new badgers_js_1.default(numBadgers);
        var leveller = new index_js_1.default();
        leveller.currentDeadCount = 1;
        var turn = 1;
        leveller.endTurnCurrentDead = turn;
        leveller.processWeapons(user, badgers, turn);
        expect(leveller.currentDeadCount).toBe(0);
    });
});
