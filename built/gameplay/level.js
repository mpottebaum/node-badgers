"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var clear_js_1 = require("../helpers/clear.js");
var frame_js_1 = require("../display/frame.js");
var badgers_js_1 = require("../models/badgers.js");
var user_js_1 = require("../models/user.js");
var levelIntro_js_1 = require("./levelIntro.js");
var keypress_1 = require("keypress");
var checkLevelEnd_js_1 = require("../helpers/checkLevelEnd.js");
var index_js_1 = require("../models/leveller/index.js");
var levelEnd_js_1 = require("./levelEnd.js");
var turnRate = 100;
var turnsPerBadgerMove = 10;
var level = function (game) { return __awaiter(void 0, void 0, void 0, function () {
    var badgers, user, leveller, endLevel, onKeyPress;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, levelIntro_js_1.default)(game.numBadgers)];
            case 1:
                _a.sent();
                badgers = new badgers_js_1.default(game.numBadgers);
                user = new user_js_1.default(game.numBadgers);
                leveller = new index_js_1.default();
                game.start();
                endLevel = new Promise(function (resolve) {
                    var levelInterval = setInterval(function () { return __awaiter(void 0, void 0, void 0, function () {
                        var isEndLevel;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    isEndLevel = (0, checkLevelEnd_js_1.default)(user, badgers);
                                    if (!isEndLevel) return [3 /*break*/, 2];
                                    clearInterval(levelInterval);
                                    process.stdin.removeListener('keypress', onKeyPress);
                                    return [4 /*yield*/, (0, levelEnd_js_1.default)(user, badgers, game, leveller)];
                                case 1:
                                    _a.sent();
                                    resolve();
                                    _a.label = 2;
                                case 2:
                                    game.incTurn();
                                    leveller.processWeapons(user, badgers, game.turn);
                                    if (game.turn % turnsPerBadgerMove === 0)
                                        badgers.makeMoves(user);
                                    (0, clear_js_1.default)();
                                    (0, frame_js_1.default)(user, badgers, leveller);
                                    return [2 /*return*/];
                            }
                        });
                    }); }, turnRate);
                });
                (0, keypress_1.default)(process.stdin);
                onKeyPress = function (ch, key) {
                    if (key.ctrl && key.name === 'c')
                        process.exit();
                    if (key.name == 'up')
                        user.moveUp(1);
                    if (key.name == 'down')
                        user.moveDown(1);
                    if (key.name == 'left')
                        user.moveLeft(1);
                    if (key.name == 'right')
                        user.moveRight(1);
                    if (key.name === 'space')
                        user.changeWeapon(user.weapon === 'gun' ? 'grenade' : 'gun');
                    if (user.weapon === 'grenade' && user.grenades > 0) {
                        if (key.name === 'q')
                            leveller.createGrenade(315);
                        if (key.name === 'w')
                            leveller.createGrenade(0);
                        if (key.name === 'e')
                            leveller.createGrenade(45);
                        if (key.name === 'd')
                            leveller.createGrenade(90);
                        if (key.name === 'c')
                            leveller.createGrenade(135);
                        if (key.name === 'x')
                            leveller.createGrenade(180);
                        if (key.name === 'z')
                            leveller.createGrenade(225);
                        if (key.name === 'a')
                            leveller.createGrenade(270);
                    }
                    if (user.weapon === 'gun' && user.bullets > 0) {
                        if (key.name === 'w')
                            leveller.createShot(0);
                        if (key.name === 'd')
                            leveller.createShot(90);
                        if (key.name === 'x')
                            leveller.createShot(180);
                        if (key.name === 'a')
                            leveller.createShot(270);
                    }
                };
                process.stdin.on('keypress', onKeyPress);
                process.stdin.setRawMode(true);
                process.stdin.resume();
                return [2 /*return*/, endLevel];
        }
    });
}); };
exports.default = level;
