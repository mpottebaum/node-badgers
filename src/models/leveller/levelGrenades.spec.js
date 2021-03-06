import LevelGrenades from "./levelGrenades.js";
import User from '../user.js'
import Badgers from '../badgers.js'

describe('LevelGrenades model', () => {
    it('should know if it has active grenades', () => {
        const levelGrenades = new LevelGrenades()
        expect(levelGrenades.hasActiveGrenades()).toBeFalsy()
        levelGrenades.createGrenade(0)
        expect(levelGrenades.hasActiveGrenades()).toBeTruthy()
    })

    it('should return all active grenades', () => {
        const levelGrenades = new LevelGrenades()
        expect(levelGrenades.activeGrenades()).toHaveLength(0)
        levelGrenades.createGrenade(0)
        expect(levelGrenades.activeGrenades()).toHaveLength(1)
    })

    it('should process grenades based on move turns/blast status', () => {
        const numBadgers = 2
        let turn = 1
        const user = new User(numBadgers)
        const startGrenades = user.grenades
        const badgers = new Badgers(numBadgers)
        const levelGrenades = new LevelGrenades()
        levelGrenades.currentDeadCount = 0
        levelGrenades.createGrenade(0)
        const grenade = levelGrenades.grenades[0]

        levelGrenades.processGrenades(user, badgers, turn)
        expect(grenade.isNew()).toBeFalsy()
        expect(user.grenades).toBe(startGrenades - 1)
        const { x, y} = grenade.coordinates
        const startCoordinates = { x, y }

        turn += 3
        levelGrenades.processGrenades(user, badgers, turn)
        expect(grenade.coordinates.y).toBe(startCoordinates.y - 1)

        turn += 3
        levelGrenades.processGrenades(user, badgers, turn)
        expect(grenade.coordinates.y).toBe(startCoordinates.y - 2)

        turn += 3
        levelGrenades.processGrenades(user, badgers, turn)
        expect(grenade.coordinates.y).toBe(startCoordinates.y - 3)

        turn += 3
        levelGrenades.processGrenades(user, badgers, turn)
        expect(grenade.blast).toBe(1)
        expect(grenade.coordinates.y).toBe(startCoordinates.y - 3)

        turn += 2
        levelGrenades.processGrenades(user, badgers, turn)
        expect(grenade.blast).toBe(2)
        expect(grenade.secondBlastCoordinates).toBeTruthy()
        expect(grenade.coordinates.y).toBe(startCoordinates.y - 3)

        turn += 2
        levelGrenades.processGrenades(user, badgers, turn)
        expect(grenade.blast).toBe(3)
        expect(grenade.thirdBlastCoordinates).toBeTruthy()
        expect(grenade.coordinates.y).toBe(startCoordinates.y - 3)
    })

    it('should return unexploded grenades or false', () => {
        const levelGrenades = new LevelGrenades()
        expect(levelGrenades.unexplodedGrenades()).toBeFalsy()
        levelGrenades.createGrenade(0)
        expect(levelGrenades.unexplodedGrenades()).toHaveLength(1)
    })

    it('should update current dead count if there are dead', () => {
        const numBadgers = 1
        let turn = 1
        const user = new User(numBadgers)
        const badgers = new Badgers(numBadgers)
        badgers.current()[0].coordinates = user.coordinates
        const levelGrenades = new LevelGrenades()
        levelGrenades.currentDeadCount = 0
        levelGrenades.createGrenade(0)
        const grenade = levelGrenades.grenades[0]
        grenade.start(user.coordinates, turn)
        grenade.setSecondBlast()
        grenade.setThirdBlast()
        turn = grenade.moveTurns.thirdBlast

        levelGrenades.killPlayersGrenades(user, badgers, turn)
        expect(levelGrenades.currentDeadCount).toBe(1)
        expect(levelGrenades.endTurnCurrentDead).toBe(turn + 15)
    })

    it('should award user points on grenade kill', () => {
        const numBadgers = 1
        let turn = 1
        const user = new User(numBadgers)
        const badgers = new Badgers(numBadgers)
        badgers.current()[0].coordinates = user.coordinates
        const levelGrenades = new LevelGrenades()
        levelGrenades.currentDeadCount = 0
        levelGrenades.createGrenade(0)
        const grenade = levelGrenades.grenades[0]
        grenade.start(user.coordinates, turn)
        grenade.setSecondBlast()
        grenade.setThirdBlast()
        turn = grenade.moveTurns.thirdBlast

        levelGrenades.killPlayersGrenades(user, badgers, turn)
        turn = grenade.moveTurns.dead
        levelGrenades.grenadeCleanUp(user, badgers, turn)
        expect(user.points).toBeGreaterThan(0)
    })

    it('should delete dead badgers after grenade end', () => {
        const numBadgers = 1
        let turn = 1
        const user = new User(numBadgers)
        const badgers = new Badgers(numBadgers)
        const badger = badgers.current()[0]
        badger.coordinates = user.coordinates
        const levelGrenades = new LevelGrenades()
        levelGrenades.currentDeadCount = 0
        levelGrenades.createGrenade(0)
        const grenade = levelGrenades.grenades[0]
        grenade.start(user.coordinates, turn)
        grenade.setSecondBlast()
        grenade.setThirdBlast()
        turn = grenade.moveTurns.thirdBlast

        levelGrenades.killPlayersGrenades(user, badgers, turn)
        turn = grenade.moveTurns.end
        levelGrenades.grenadeCleanUp(user, badgers, turn)
        expect(badger.deleted).toBeTruthy()
    })

    it('should know if it has miss grenades', () => {
        const levelGrenades = new LevelGrenades()
        levelGrenades.createGrenade(0)
        const grenade = levelGrenades.grenades[0]
        grenade.isExploded = true
        
        expect(levelGrenades.hasMissGrenades()).toBeTruthy()
    })

    it('should return hit grenades or false', () => {
        const levelGrenades = new LevelGrenades()
        levelGrenades.createGrenade(0)
        const grenade = levelGrenades.grenades[0]
        grenade.isExploded = true
        
        expect(levelGrenades.hitGrenades()).toBeFalsy()

        grenade.deadBadgers = [{}]
        expect(levelGrenades.hitGrenades()).toHaveLength(1)
    })
})