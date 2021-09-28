import Badger from './badger.js'
import User from './user.js'
import Grenade from './grenade.js'

describe('Badger model', () => {
    it('should move toward the user', () => {
        const badger = new Badger('name')
        const user = new User(1)
        const userX = 22, userY = 12
        user.coordinates = { y: userY, x: userX }

        const rightBadgerX = userX + 8
        badger.coordinates = { y: userY, x: rightBadgerX }
        badger.move(user)
        expect(badger.coordinates.x).toBe(rightBadgerX - (badger.pace * 2))
        expect(badger.coordinates.y).toBe(userY)

        const leftBadgerX = userX - 8
        badger.coordinates = { y: userY, x: leftBadgerX }
        badger.move(user)
        expect(badger.coordinates.x).toBe(leftBadgerX + (badger.pace * 2))
        expect(badger.coordinates.y).toBe(userY)

        const aboveBadgerY = userY - 8
        badger.coordinates = { y: aboveBadgerY, x: userX }
        badger.move(user)
        expect(badger.coordinates.x).toBe(userX)
        expect(badger.coordinates.y).toBe(aboveBadgerY + badger.pace)

        const belowBadgerY = userY + 8
        badger.coordinates = { y: belowBadgerY, x: userX }
        badger.move(user)
        expect(badger.coordinates.x).toBe(userX)
        expect(badger.coordinates.y).toBe(belowBadgerY - badger.pace)

        badger.coordinates = { y: belowBadgerY, x: leftBadgerX }
        badger.move(user)
        expect(badger.coordinates.x).toBe(leftBadgerX + badger.pace)
        expect(badger.coordinates.y).toBe(belowBadgerY - badger.pace)

        badger.coordinates = { y: aboveBadgerY, x: leftBadgerX }
        badger.move(user)
        expect(badger.coordinates.x).toBe(leftBadgerX + badger.pace)
        expect(badger.coordinates.y).toBe(aboveBadgerY + badger.pace)

        badger.coordinates = { y: belowBadgerY, x: rightBadgerX }
        badger.move(user)
        expect(badger.coordinates.x).toBe(rightBadgerX - badger.pace)
        expect(badger.coordinates.y).toBe(belowBadgerY - badger.pace)

        badger.coordinates = { y: aboveBadgerY, x: rightBadgerX }
        badger.move(user)
        expect(badger.coordinates.x).toBe(rightBadgerX - badger.pace)
        expect(badger.coordinates.y).toBe(aboveBadgerY + badger.pace)
    })

    it('should kill badger on kill', () => {
        const badger = new Badger('name')
        badger.kill()
        expect(badger.alive).toBeFalsy()
    })

    it('should delete badger on delete', () => {
        const badger = new Badger('name')
        badger.delete()
        expect(badger.deleted).toBeTruthy()
    })

    it('should start badger within coordinate boundaries', () => {
        const badger = new Badger('name')
        badger.startCoordinates()
        expect(badger.coordinates.y <= 12).toBeTruthy()
        expect(badger.coordinates.x <= 40).toBeTruthy()
    })

    it('should affirm badger is in blast', () => {
        const badger = new Badger('name')
        badger.coordinates = { y: 12, x: 24 }
        const grenade = new Grenade(0, 2)
        grenade.start(badger.coordinates, 1)
        grenade.setSecondBlast()
        grenade.setThirdBlast()
        const isInBlast = badger.isInBlast(grenade)
        expect(isInBlast).toBeTruthy()
    })

    it('should affirm badger is not in blast', () => {
        const badger = new Badger('name')
        badger.coordinates = { y: 12, x: 24 }
        const grenade = new Grenade(0, 2)
        grenade.start(badger.coordinates, 1)
        grenade.fullMovement()
        grenade.fullMovement()
        grenade.fullMovement()
        grenade.setSecondBlast()
        grenade.setThirdBlast()
        const isInBlast = badger.isInBlast(grenade)
        expect(isInBlast).toBeFalsy()
    })
})