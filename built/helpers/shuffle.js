"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var shuffle = function (arr) {
    var j, x, index = arr.length - 1;
    while (index > 0) {
        j = Math.floor(Math.random() * (index + 1));
        x = arr[index];
        arr[index] = arr[j];
        arr[j] = x;
        index--;
    }
    return arr;
};
exports.default = shuffle;
