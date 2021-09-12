import Movement from './movement.js'
import { xMax, yMax } from '../display/emptyGymHash.js'

class User extends Movement {
    constructor(numBadgers) {
        super(yMax, xMax / 2)
        this.bullets = Math.ceil(Math.sqrt(numBadgers))
        this.grenades = Math.ceil(Math.log(numBadgers)) + 2
        this.stamina = 3
        this.tired = false
        this.alive = true
        this.win = false
        this.points = 0
        this.weapon = 'gun'
    }

    changeWeapon(weapon) {
        this.weapon = weapon
    }

    decStamina() {
        this.stamina -= 1
    }

    restoreStamina() {
        this.tiredTurn = null
        this.stamina = 3
    }

    isStaminaRecharged(game) {
        if(!this.tiredTurn) return false
        return game.turn - this.tiredTurn === 3
    }

    shoot() {
        this.bullets -= 1
    }

    killIfInBlast(grenade) {
        if(grenade.thirdBlastCoordinates.some(c => c.x === this.coordinates.x && c.y === this.coordinates.y)) {
            return this.alive = false
        }
        return true
    }

    shootBadgerPoints() {
        this.points += 300
    }

    grenadeKillBadgerPoints(numBadgers) {
        this.points += (300 * (numBadgers**numBadgers))
    }

    survivalPoints(numBadgers) {
        this.points += (1000 * numBadgers)
        this.points += (50 * this.bullets)
        this.points += (500 * this.grenades)
    }
}

export default User
