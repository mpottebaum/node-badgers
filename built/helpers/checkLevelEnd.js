"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var checkWin = function (user, badgers) {
    if (user.coordinates.y === 0 && [20, 21, 22, 23].includes(user.coordinates.x)) {
        user.win = true;
    }
    else if (badgers.current().length === 0) {
        user.win = true;
    }
};
var checkAlive = function (user, badgers) {
    if (badgers.killerBadger()) {
        user.alive = false;
    }
};
var checkLevelEnd = function (user, badgers) {
    checkWin(user, badgers);
    checkAlive(user, badgers);
    return (!user.alive || user.win);
};
exports.default = checkLevelEnd;
