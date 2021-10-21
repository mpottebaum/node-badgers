"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.yMin = exports.yMax = exports.xMin = exports.xMax = void 0;
var emptyGymHash = function () {
    var keyPipes1 = "|             |          |               |".split("");
    var keyPipes2 = "|             |          |               |".split("");
    var keyPipes3 = "|             |          |               |".split("");
    var topCircleOne = "|             |  .-\"\"-.  |               |".split("");
    var firstArcCircleOne = "|             |/`      `\\|               |".split("");
    var firstMiddleCircleOne = "|             ;          ;               |".split("");
    var secondMiddleCircleOne = "|             ;          ;               |".split("");
    var secondArcCircleOne = "|              \\        /                |".split("");
    var bottomCircleOne = "|               `'-..-'`                 |".split("");
    var justPipes1 = "|                                        |".split("");
    var justPipes2 = "|                                        |".split("");
    var justPipes3 = "|                                        |".split("");
    var midCourt = "|----------------------------------------|".split("");
    var justPipes4 = "|                                        |".split("");
    var justPipes5 = "|                                        |".split("");
    var justPipes6 = "|                                        |".split("");
    var topCircleTwo = "|                .-\"\"-.                  |".split("");
    var firstArcCircleTwo = "|              /`      `\\                |".split("");
    var firstMiddleCircleTwo = "|             ;          ;               |".split("");
    var secondMiddleCircleTwo = "|             ;          ;               |".split("");
    var secondArcCircleTwo = "|             |\\        /|               |".split("");
    var bottomCircleTwo = "|             | `'-..-'` |               |".split("");
    var keyPipes4 = "|             |          |               |".split("");
    var keyPipes5 = "|             |          |               |".split("");
    var keyPipes6 = "|             |          |               |".split("");
    return [
        keyPipes1,
        keyPipes2,
        keyPipes3,
        topCircleOne,
        firstArcCircleOne,
        firstMiddleCircleOne,
        secondMiddleCircleOne,
        secondArcCircleOne,
        bottomCircleOne,
        justPipes1,
        justPipes2,
        justPipes3,
        midCourt,
        justPipes4,
        justPipes5,
        justPipes6,
        topCircleTwo,
        firstArcCircleTwo,
        firstMiddleCircleTwo,
        secondMiddleCircleTwo,
        secondArcCircleTwo,
        bottomCircleTwo,
        keyPipes4,
        keyPipes5,
        keyPipes6,
    ];
};
exports.default = emptyGymHash;
var emptyGym = emptyGymHash();
var gymWidth = emptyGym[0].length;
var gymHeight = emptyGym.length;
// width 42
// height 25
exports.xMax = gymWidth - 2;
exports.xMin = 1;
exports.yMax = gymHeight - 1;
exports.yMin = 0;
