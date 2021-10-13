import LevelShots from './levelShots.js'
import User from '../user.js'
import Badgers from '../badgers.js'
import { yMax, yMin, xMax, xMin } from '../../display/emptyGymHash.js'

describe('LevelShots model', () => {
    it('should know if it has active shots', () => {
        const levelShots = new LevelShots()
        expect(levelShots.hasActiveShots()).toBeFalsy()
        levelShots.createShot(0)
        expect(levelShots.hasActiveShots()).toBeTruthy()
    })

    it('should return all active shots', () => {
        const levelShots = new LevelShots()
        levelShots.createShot(0)
        expect(levelShots.activeShots()).toHaveLength(1)
    })

    it('should process all shots based on shooting/moving status', () => {
        const numBadgers = 2
        let turn = 1
        const user = new User(numBadgers)
        const startBullets = user.bullets
        const badgers = new Badgers(numBadgers)
        const levelShots = new LevelShots()
        levelShots.currentDeadCount = 0
        levelShots.createShot(0)
        const shot = levelShots.shots[0]

        levelShots.processShots(user, badgers, turn)
        expect(shot.isNew).toBeFalsy()
        expect(user.bullets).toBe(startBullets - 1)
        
        turn += 1
        levelShots.processShots(user, badgers, turn)
        expect(shot.coordinates.y).toBe(user.coordinates.y - 2)

        shot.coordinates.y = yMin
        shot.moveShot(turn, badgers)
        turn = shot.moveTurns.dead
        levelShots.processShots(user, badgers, turn)
        expect(levelShots.currentDeadCount).toBe(0)

        const deadBadger = badgers.current()[0]
        deadBadger.alive = false
        shot.deadBadgers.push(deadBadger)
        levelShots.processShots(user, badgers, turn)
        expect(levelShots.currentDeadCount).toBe(1)
        expect(levelShots.endTurnCurrentDead).toBe(turn + 15)
    })

    it('should return shooting shots or false', () => {
        const levelShots = new LevelShots()
        levelShots.createShot(0)
        expect(levelShots.shootingShots()).toBeFalsy()
        levelShots.shots[0].isShooting = true
        expect(levelShots.shootingShots()).toHaveLength(1)
    })

    it('should return moving shots or false', () => {
        const levelShots = new LevelShots()
        levelShots.createShot(0)
        expect(levelShots.movingShots()).toBeFalsy()
        levelShots.shots[0].isMoving = true
        expect(levelShots.movingShots()).toHaveLength(1)
    })

    it('should return hit shots or false', () => {
        const levelShots = new LevelShots()
        levelShots.createShot(0)
        expect(levelShots.hitShots()).toBeFalsy()
        levelShots.shots[0].deadBadgers.push({})
        expect(levelShots.hitShots()).toHaveLength(1)
    })

    it('should know if it has miss shots', () => {
        const levelShots = new LevelShots()
        levelShots.createShot(0)
        expect(levelShots.hasMissShots()).toBeFalsy()
        levelShots.shots[0].moveTurns = { dead: 10 }
        expect(levelShots.hasMissShots()).toBeTruthy()
    })

})