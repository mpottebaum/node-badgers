import Badgers from './badgers.js'
import User from './user.js'
import Grenade from './grenade.js'

describe('Badgers model', () => {
    it('should generate given number of badgers when initialized', () => {
        const badgers = new Badgers(2)
        expect(badgers.badgers.length).toBe(2)
    })

    it('should return dead badgers that are not deleted', () => {
        const badgers = new Badgers(3)
        const deadBadger = badgers.current()[0]
        const deletedBadger = badgers.current()[1]
        deadBadger.alive = false
        deletedBadger.alive = false
        deletedBadger.deleted = true

        expect(badgers.dead()).toHaveLength(1)
    })

    it('should mark badger as killer when near user before moves', () => {
        const numBadgers = 2
        const badgers = new Badgers(numBadgers)
        const user = new User(numBadgers)
        const killerBadger = badgers.current()[0]
        killerBadger.coordinates = {
            y: user.coordinates.y + 1,
            x: user.coordinates.x,
        }

        badgers.makeMoves(user)
        expect(killerBadger.killer).toBeTruthy()
    })

    it('should return an array of only the current badger coordinates', () => {
        const badgers = new Badgers(3)
        badgers.current()[0].deleted = true

        expect(badgers.currentBadgersCoordinates()).toHaveLength(2)
        expect(badgers.currentBadgersCoordinates()[0].x).toBeTruthy()
    })

    it('should mark dead badgers as deleted', () => {
        const badgers = new Badgers(3)
        const deadBadger = badgers.current()[0]
        deadBadger.alive = false

        badgers.removeDead()
        expect(deadBadger.deleted).toBeTruthy()
    })

    it('should kill badgers in grenade blast', () => {
        const badgers = new Badgers(1)
        const badger = badgers.current()[0]
        badger.coordinates = { y: 12, x: 24 }
        const grenade = new Grenade(0, 2)
        grenade.start(badger.coordinates, 1)
        grenade.setSecondBlast()
        grenade.setThirdBlast()

        const deadBadgers = badgers.killBadgersInBlast(grenade)
        expect(badger.alive).toBeFalsy()
        expect(deadBadgers).toHaveLength(1)
    })

    it('should not kill badgers not in grenade blast', () => {
        const numBadgers = 1
        const badgers = new Badgers(numBadgers)
        const badger = badgers.current()[0]
        const user = new User(numBadgers)
        const grenade = new Grenade(0, 2)
        grenade.start(user.coordinates, 1)
        grenade.setSecondBlast()
        grenade.setThirdBlast()

        const deadBadgers = badgers.killBadgersInBlast(grenade)
        expect(badger.alive).toBeTruthy()
        expect(deadBadgers).toBeFalsy()
    })
})