"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.displayWinGym = exports.displayGym = void 0;
var displayGym = function (gymHash) {
    console.log(" ------------------    ------------------ ");
    gymHash.forEach(function (row) {
        console.log(row.join(""));
    });
    console.log(" ---------------------------------------- ");
};
exports.displayGym = displayGym;
var displayWinGym = function (user, gymHash) {
    var top = " ------------------    ------------------ ".split("");
    if (user.coordinates.x <= 23 && user.coordinates.x >= 20) {
        top[user.coordinates.x] = '&';
    }
    else {
        top[21] = '&';
    }
    console.log(top.join(""));
    gymHash.forEach(function (row) {
        console.log(row.join(""));
    });
    console.log(" ---------------------------------------- ");
};
exports.displayWinGym = displayWinGym;
