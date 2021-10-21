"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var levelGrenades_js_1 = require("./levelGrenades.js");
var Leveller = /** @class */ (function (_super) {
    __extends(Leveller, _super);
    function Leveller() {
        var _this = _super.call(this) || this;
        _this.currentDeadCount = 0;
        _this.endTurnCurrentDead = 0;
        return _this;
    }
    Leveller.prototype.processWeapons = function (user, badgers, turn) {
        this.processShots(user, badgers, turn);
        this.processGrenades(user, badgers, turn);
        if (turn === this.endTurnCurrentDead) {
            this.currentDeadCount = 0;
        }
    };
    return Leveller;
}(levelGrenades_js_1.default));
exports.default = Leveller;
