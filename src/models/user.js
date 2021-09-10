import Movement from './movement.js'

class User extends Movement {
    constructor(numBadgers) {
        super(24, 20)
        this.bullets = Math.ceil(Math.sqrt(numBadgers))
        this.grenades = Math.ceil(Math.log(numBadgers)) + 2
        this.stamina = 3
        this.tired = false
        this.alive = true
        this.win = false
        this.points = 0
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
    }

    turnMenuOptions() {
        const options = ["Walk"]
        if(!this.tired) options.push("Run")
        if(this.grenades > 0) options.push("Throw grenade")
        if(this.bullets > 0) options.push("Shoot at badger")
        return options
    }

    movement(pace, direction){
        switch(direction) {
            case 'Up':
                this.moveUp(pace)
                break;
            case 'Left':
                this.moveLeft(pace)
                break;
            case 'Right':
                this.moveRight(pace)
                break;
            case 'Down':
                this.moveDown(pace)
                break;
            default:
                return
        }
    }
}

export default User
