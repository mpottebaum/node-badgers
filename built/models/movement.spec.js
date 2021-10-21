import Movement from './movement.js';
import { xMax, xMin, yMax, yMin } from '../display/emptyGymHash.js';
describe('Movement model', () => {
    it('should move up', () => {
        const movement = new Movement(5, 5);
        movement.moveUp(1);
        expect(movement.coordinates.y).toBe(4);
    });
    it('should not move up passed top gym boundary', () => {
        const movement = new Movement(yMin, 5);
        movement.moveUp(1);
        expect(movement.coordinates.y).toBe(yMin);
    });
    it('should move down', () => {
        const movement = new Movement(5, 5);
        movement.moveDown(1);
        expect(movement.coordinates.y).toBe(6);
    });
    it('should not move down passed bottom gym boundary', () => {
        const movement = new Movement(yMax, 5);
        movement.moveDown(1);
        expect(movement.coordinates.y).toBe(yMax);
    });
    it('should move left', () => {
        const movement = new Movement(5, 5);
        movement.moveLeft(1);
        expect(movement.coordinates.x).toBe(3);
    });
    it('should not move left passed left gym boundary', () => {
        const movement = new Movement(5, xMin);
        movement.moveLeft(1);
        expect(movement.coordinates.x).toBe(xMin);
    });
    it('should move right', () => {
        const movement = new Movement(5, 5);
        movement.moveRight(1);
        expect(movement.coordinates.x).toBe(7);
    });
    it('should not move right passed right gym boundary', () => {
        const movement = new Movement(5, xMax);
        movement.moveRight(1);
        expect(movement.coordinates.x).toBe(xMax);
    });
    it('should move 45 degrees', () => {
        const movement = new Movement(5, 5);
        movement.move45();
        expect(movement.coordinates.y).toBe(4);
        expect(movement.coordinates.x).toBe(6);
    });
    it('should move 135 degrees', () => {
        const movement = new Movement(5, 5);
        movement.move135();
        expect(movement.coordinates.y).toBe(6);
        expect(movement.coordinates.x).toBe(6);
    });
    it('should move 225 degrees', () => {
        const movement = new Movement(5, 5);
        movement.move225();
        expect(movement.coordinates.y).toBe(6);
        expect(movement.coordinates.x).toBe(4);
    });
    it('should move 315 degrees', () => {
        const movement = new Movement(5, 5);
        movement.move315();
        expect(movement.coordinates.y).toBe(4);
        expect(movement.coordinates.x).toBe(4);
    });
});
