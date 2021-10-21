import User from './user.js'
import Grenade from './grenade.js'

describe('User model', () => {
    it('should change weapon', () => {
        const user = new User(2)
        user.changeWeapon('gun')
        expect(user.weapon).toBe('gun')
    })

    it('should decrease bullet count on shot', () => {
        const user = new User(2)
        const startBullets = user.bullets
        user.shoot()
        expect(user.bullets).toBe(startBullets - 1)
    })

    it('should kill user if in grenade blast', () => {
        const user = new User(2)
        const grenade = new Grenade(0, 2)
        grenade.start(user.coordinates, 1)
        grenade.setSecondBlast()
        grenade.setThirdBlast()
        user.killIfInBlast(grenade)
        expect(user.alive).toBeFalsy()
    })

    it('should not kill user if not in grenade blast', () => {
        const user = new User(2)
        const grenade = new Grenade(0, 2)
        grenade.start(user.coordinates, 1)
        grenade.fullMovement()
        grenade.fullMovement()
        grenade.fullMovement()
        grenade.setSecondBlast()
        grenade.setThirdBlast()
        user.killIfInBlast(grenade)
        expect(user.alive).toBeTruthy()
    })

    it('should award points on shot kill', () => {
        const user = new User(2)
        user.shootBadgerPoints()
        expect(user.points).toBe(300)
    })

    it('should award points on grenade kill', () => {
        const user = new User(2)
        user.grenadeKillBadgerPoints(2)
        expect(user.points).toBe(1200)
    })

    it('should award points on level survival', () => {
        const user = new User(2)
        const bullets = user.bullets
        const grenades = user.grenades
        user.survivalPoints(2)
        const points = 2000 + (bullets * 50) + (grenades * 500)
        expect(user.points).toBe(points)
    })
})