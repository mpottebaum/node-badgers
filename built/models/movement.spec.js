"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var movement_js_1 = require("./movement.js");
var emptyGymHash_js_1 = require("../display/emptyGymHash.js");
describe('Movement model', function () {
    it('should move up', function () {
        var movement = new movement_js_1.default(5, 5);
        movement.moveUp(1);
        expect(movement.coordinates.y).toBe(4);
    });
    it('should not move up passed top gym boundary', function () {
        var movement = new movement_js_1.default(emptyGymHash_js_1.yMin, 5);
        movement.moveUp(1);
        expect(movement.coordinates.y).toBe(emptyGymHash_js_1.yMin);
    });
    it('should move down', function () {
        var movement = new movement_js_1.default(5, 5);
        movement.moveDown(1);
        expect(movement.coordinates.y).toBe(6);
    });
    it('should not move down passed bottom gym boundary', function () {
        var movement = new movement_js_1.default(emptyGymHash_js_1.yMax, 5);
        movement.moveDown(1);
        expect(movement.coordinates.y).toBe(emptyGymHash_js_1.yMax);
    });
    it('should move left', function () {
        var movement = new movement_js_1.default(5, 5);
        movement.moveLeft(1);
        expect(movement.coordinates.x).toBe(3);
    });
    it('should not move left passed left gym boundary', function () {
        var movement = new movement_js_1.default(5, emptyGymHash_js_1.xMin);
        movement.moveLeft(1);
        expect(movement.coordinates.x).toBe(emptyGymHash_js_1.xMin);
    });
    it('should move right', function () {
        var movement = new movement_js_1.default(5, 5);
        movement.moveRight(1);
        expect(movement.coordinates.x).toBe(7);
    });
    it('should not move right passed right gym boundary', function () {
        var movement = new movement_js_1.default(5, emptyGymHash_js_1.xMax);
        movement.moveRight(1);
        expect(movement.coordinates.x).toBe(emptyGymHash_js_1.xMax);
    });
    it('should move 45 degrees', function () {
        var movement = new movement_js_1.default(5, 5);
        movement.move45();
        expect(movement.coordinates.y).toBe(4);
        expect(movement.coordinates.x).toBe(6);
    });
    it('should move 135 degrees', function () {
        var movement = new movement_js_1.default(5, 5);
        movement.move135();
        expect(movement.coordinates.y).toBe(6);
        expect(movement.coordinates.x).toBe(6);
    });
    it('should move 225 degrees', function () {
        var movement = new movement_js_1.default(5, 5);
        movement.move225();
        expect(movement.coordinates.y).toBe(6);
        expect(movement.coordinates.x).toBe(4);
    });
    it('should move 315 degrees', function () {
        var movement = new movement_js_1.default(5, 5);
        movement.move315();
        expect(movement.coordinates.y).toBe(4);
        expect(movement.coordinates.x).toBe(4);
    });
});
