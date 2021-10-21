import Badgers from './badgers.js';
import User from './user.js';
import Grenade from './grenade.js';
import { xMax, xMin, yMax, yMin } from '../display/emptyGymHash.js';
describe('Grenade model', () => {
    it('should be new before grenade start', () => {
        const grenade = new Grenade(0, 2);
        expect(grenade.isNew()).toBeTruthy();
    });
    it('should start grenade one space away from user based on initial angle', () => {
        const user = new User(2);
        const grenade = new Grenade(0, 2);
        grenade.startCoordinates(user.coordinates);
        expect(grenade.coordinates.y).toBe(user.coordinates.y - 1);
        grenade.angle = 90;
        grenade.startCoordinates(user.coordinates);
        expect(grenade.coordinates.x).toBe(user.coordinates.x + 1);
        grenade.angle = 180;
        grenade.startCoordinates(user.coordinates);
        expect(grenade.coordinates.y).toBe(user.coordinates.y + 1);
        grenade.angle = 270;
        grenade.startCoordinates(user.coordinates);
        expect(grenade.coordinates.x).toBe(user.coordinates.x - 1);
    });
    it('should move grenade based on moveTurns', () => {
        const user = new User(2);
        const power = 2;
        const grenade = new Grenade(0, power);
        let turn = 1;
        grenade.start(user.coordinates, turn);
        const startY = grenade.coordinates.y;
        turn += 3;
        grenade.moveGrenade(turn);
        expect(grenade.coordinates.y).toBe(startY - power);
        turn += 3;
        grenade.moveGrenade(turn);
        expect(grenade.coordinates.y).toBe(startY - (power * 2));
        turn += 3;
        grenade.moveGrenade(turn);
        expect(grenade.coordinates.y).toBe(startY - (power * 3));
        turn += 3;
        grenade.moveGrenade(turn);
        expect(grenade.blast).toBe(1);
        turn += 2;
        grenade.moveGrenade(turn);
        expect(grenade.blast).toBe(2);
        expect(grenade.secondBlastCoordinates).toBeTruthy();
        turn += 2;
        grenade.moveGrenade(turn);
        expect(grenade.blast).toBe(3);
        expect(grenade.thirdBlastCoordinates).toBeTruthy();
        turn += 10;
        grenade.moveGrenade(turn);
        expect(grenade.blast).toBeFalsy();
        expect(grenade.isExploded).toBeTruthy();
        turn += 15;
        grenade.moveGrenade(turn);
        expect(grenade.deleted).toBeTruthy();
    });
    it('should adjust angle when grenade hits boundaries', () => {
        const grenade = new Grenade(0, 2);
        grenade.startCoordinates({
            y: yMin + 1,
            x: 20,
        });
        grenade.checkAngleAndAdjust();
        expect(grenade.angle).toBe(180);
        grenade.angle = 45;
        grenade.startCoordinates({
            y: yMin + 1,
            x: xMax,
        });
        grenade.checkAngleAndAdjust();
        expect(grenade.angle).toBe(225);
        grenade.angle = 45;
        grenade.startCoordinates({
            y: yMin + 1,
            x: 20,
        });
        grenade.checkAngleAndAdjust();
        expect(grenade.angle).toBe(135);
        grenade.angle = 45;
        grenade.startCoordinates({
            y: 10,
            x: xMax,
        });
        grenade.checkAngleAndAdjust();
        expect(grenade.angle).toBe(315);
        grenade.angle = 90;
        grenade.startCoordinates({
            y: 10,
            x: xMax - 1,
        });
        grenade.checkAngleAndAdjust();
        expect(grenade.angle).toBe(270);
        grenade.angle = 135;
        grenade.startCoordinates({
            y: yMax - 1,
            x: xMax,
        });
        grenade.checkAngleAndAdjust();
        expect(grenade.angle).toBe(315);
        grenade.angle = 135;
        grenade.startCoordinates({
            y: yMax - 1,
            x: 20,
        });
        grenade.checkAngleAndAdjust();
        expect(grenade.angle).toBe(45);
        grenade.angle = 135;
        grenade.startCoordinates({
            y: 10,
            x: xMax,
        });
        grenade.checkAngleAndAdjust();
        expect(grenade.angle).toBe(225);
        grenade.angle = 180;
        grenade.startCoordinates({
            y: yMax - 1,
            x: 20,
        });
        grenade.checkAngleAndAdjust();
        expect(grenade.angle).toBe(0);
        grenade.angle = 225;
        grenade.startCoordinates({
            y: yMax - 1,
            x: xMin,
        });
        grenade.checkAngleAndAdjust();
        expect(grenade.angle).toBe(45);
        grenade.angle = 225;
        grenade.startCoordinates({
            y: yMax - 1,
            x: 20,
        });
        grenade.checkAngleAndAdjust();
        expect(grenade.angle).toBe(315);
        grenade.angle = 225;
        grenade.startCoordinates({
            y: 10,
            x: xMin,
        });
        grenade.checkAngleAndAdjust();
        expect(grenade.angle).toBe(135);
        grenade.angle = 270;
        grenade.startCoordinates({
            y: 10,
            x: xMin + 2,
        });
        grenade.checkAngleAndAdjust();
        expect(grenade.angle).toBe(90);
        grenade.angle = 315;
        grenade.startCoordinates({
            y: yMin + 1,
            x: xMin,
        });
        grenade.checkAngleAndAdjust();
        expect(grenade.angle).toBe(135);
        grenade.angle = 315;
        grenade.startCoordinates({
            y: yMin + 1,
            x: 20,
        });
        grenade.checkAngleAndAdjust();
        expect(grenade.angle).toBe(225);
        grenade.angle = 315;
        grenade.startCoordinates({
            y: 10,
            x: xMin,
        });
        grenade.checkAngleAndAdjust();
        expect(grenade.angle).toBe(45);
    });
    it('should move grenade per angle on singleMovement', () => {
        const grenade = new Grenade(0, 2);
        const userCoordinates = {
            y: Math.round(yMax / 2),
            x: Math.round(xMax / 2),
        };
        grenade.startCoordinates(userCoordinates);
        grenade.singleMovement();
        expect(grenade.coordinates.y).toBe((userCoordinates.y - 1) - 1);
        grenade.angle = 45;
        grenade.startCoordinates(userCoordinates);
        grenade.singleMovement();
        expect(grenade.coordinates.y).toBe((userCoordinates.y - 1) - 1);
        expect(grenade.coordinates.x).toBe(userCoordinates.x + 1);
        grenade.angle = 90;
        grenade.startCoordinates(userCoordinates);
        grenade.singleMovement();
        expect(grenade.coordinates.x).toBe((userCoordinates.x + 1) + 2);
        grenade.angle = 135;
        grenade.startCoordinates(userCoordinates);
        grenade.singleMovement();
        expect(grenade.coordinates.y).toBe((userCoordinates.y + 1) + 1);
        expect(grenade.coordinates.x).toBe(userCoordinates.x + 1);
        grenade.angle = 180;
        grenade.startCoordinates(userCoordinates);
        grenade.singleMovement();
        expect(grenade.coordinates.y).toBe((userCoordinates.y + 1) + 1);
        grenade.angle = 225;
        grenade.startCoordinates(userCoordinates);
        grenade.singleMovement();
        expect(grenade.coordinates.y).toBe((userCoordinates.y + 1) + 1);
        expect(grenade.coordinates.x).toBe(userCoordinates.x - 1);
        grenade.angle = 270;
        grenade.startCoordinates(userCoordinates);
        grenade.singleMovement();
        expect(grenade.coordinates.x).toBe((userCoordinates.x - 1) - 2);
        grenade.angle = 315;
        grenade.startCoordinates(userCoordinates);
        grenade.singleMovement();
        expect(grenade.coordinates.y).toBe((userCoordinates.y - 1) - 1);
        expect(grenade.coordinates.x).toBe(userCoordinates.x - 1);
    });
    it('should kill players in its blast radius', () => {
        const numBadgers = 1;
        const user = new User(numBadgers);
        const badgers = new Badgers(numBadgers);
        const badger = badgers.current()[0];
        const grenade = new Grenade(0, 2);
        grenade.start(badger.coordinates, 1);
        grenade.setSecondBlast();
        grenade.setThirdBlast();
        grenade.killPlayersInBlastRadius(user, badgers);
        expect(grenade.deadBadgers).toHaveLength(1);
        expect(grenade.suicide).toBeFalsy();
    });
    it('should have dead if deadBadgers has badgers', () => {
        const grenade = new Grenade(0, 2);
        grenade.deadBadgers = [{ name: 'badger' }];
        expect(grenade.hasDead()).toBeTruthy();
    });
});
