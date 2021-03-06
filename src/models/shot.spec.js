import Shot from './shot.js'
import User from './user.js'
import Badgers from './badgers.js'
import { yMin } from '../display/emptyGymHash.js'

describe('Shot model', () => {
    it('should start shot one space away from user based on initial angle', () => {
        const user = new User(2)
        const shot = new Shot(0)

        shot.startCoordinates(user.coordinates)
        expect(shot.coordinates.y).toBe(user.coordinates.y - 1)
        shot.angle = 90
        shot.startCoordinates(user.coordinates)
        expect(shot.coordinates.x).toBe(user.coordinates.x + 1)
        shot.angle = 180
        shot.startCoordinates(user.coordinates)
        expect(shot.coordinates.y).toBe(user.coordinates.y + 1)
        shot.angle = 270
        shot.startCoordinates(user.coordinates)
        expect(shot.coordinates.x).toBe(user.coordinates.x - 1)
    })

    it('should be moving and shooting and not new on shoot', () => {
        const turn = 1
        const user = new User(2)
        const shot = new Shot(0)

        shot.shoot(user, turn)

        expect(shot.moveTurns).toBeTruthy()
        expect(shot.isShooting).toBeTruthy()
        expect(shot.isMoving).toBeTruthy()
        expect(shot.isNew).toBeFalsy()
    })

    it('should move shot according to its angle', () => {
        let turn = 1
        const numBadgers = 2
        const user = new User(numBadgers)
        const badgers = new Badgers(numBadgers)
        const shot = new Shot(0)

        shot.shoot(user, turn)

        turn += 1
        shot.moveShot(turn, badgers)
        expect(shot.coordinates.y).toBe((user.coordinates.y - 1) - 1)

        shot.angle = 90
        shot.moveShot(turn, badgers)
        expect(shot.coordinates.x).toBe(user.coordinates.x + 1)

        shot.angle = 180
        shot.moveShot(turn, badgers)
        expect(shot.coordinates.y).toBe(user.coordinates.y - 1)

        shot.angle = 270
        shot.moveShot(turn, badgers)
        expect(shot.coordinates.x).toBe(user.coordinates.x)
    })

    it('should move shot based on moveTurns', () => {
        let turn = 1
        const numBadgers = 2
        const user = new User(numBadgers)
        const badgers = new Badgers(numBadgers)
        const shot = new Shot(0)

        shot.shoot(user, turn)
        shot.moveShot(turn, badgers)
        expect(shot.coordinates.y).toBe(user.coordinates.y - 1)

        turn += 1
        shot.moveShot(turn, badgers)
        expect(shot.isShooting).toBeFalsy()
        expect(shot.coordinates.y).toBe((user.coordinates.y - 1) - 1)
        
        turn += 1
        shot.moveShot(turn, badgers)
        expect(shot.coordinates.y).toBe((user.coordinates.y - 1) - 2)

        shot.coordinates.y = yMin
        shot.moveShot(turn, badgers)
        expect(shot.isMoving).toBeFalsy()
        expect(shot.moveTurns.dead).toBeTruthy()
        expect(shot.moveTurns.end).toBeTruthy()

        turn = shot.moveTurns.end
        const deadBadger = badgers.current()[0]
        deadBadger.alive = false
        shot.deadBadgers.push(deadBadger)
        shot.moveShot(turn, badgers)
        expect(deadBadger.deleted).toBeTruthy()
        expect(shot.deleted).toBeTruthy()
    })

    it('should kill hit badgers', () => {
        const badgers = new Badgers(1)
        const badger = badgers.current()[0]
        const shot = new Shot(0)
        shot.coordinates = badger.coordinates

        shot.killHits(badgers)
        expect(badger.alive).toBeFalsy()
        expect(shot.deadBadgers).toHaveLength(1)
    })
})