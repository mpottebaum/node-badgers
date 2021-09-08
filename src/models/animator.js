import Grenade from './grenade.js'

class Animator {
    constructor() {
        this.weapon = ''
    }

    isAnimating() {
        return this.shot || this.grenade
    }
    
    createShot() {
        this.weapon = 'shoot'
        this.shot = {
            isNew: true,
        }
    }

    shoot(startTurn, target, hit=false) {
        this.shot = {
            ...this.shot,
            target,
            hit,
            moveTurns: {
                start: startTurn,
                dead: startTurn + 5,
                end: startTurn + 15,
            },
            isShooting: true,
            isNew: false,
        }
    }

    moveShot(turn) {
        const {
            dead,
            end,
        } = this.shot.moveTurns
        switch(turn) {
            case dead:
                if(this.shot.hit) {
                    this.shot.target = false
                    this.shotDead = true
                }
                this.shot.isShooting = false
                break;
            case end:
                if(this.shot.hit) {
                    this.shot.target.deleted = true
                    this.shotDead = false
                }
                this.shot = null
                break;
        }

    }

    createGrenade(angle) {
        this.weapon = 'grenade'
        this.grenade = new Grenade(angle, 2)
        this.blast = 0
    }

    moveGrenade(turn, result) {
        const {
            first,
            second,
            third,
            firstBlast,
            secondBlast,
            thirdBlast,
            dead,
            end,
        } = this.grenade.moveTurns
        switch(turn) {
            case first:
                this.grenade.fullMovement()
                break;
            case second:
                this.grenade.fullMovement()
                break;
            case third:
                this.grenade.fullMovement()
                break;
            case firstBlast:
                this.blast = 1
                break;
            case secondBlast:
                this.grenade.setSecondBlast()
                this.blast = 2
                break;
            case thirdBlast:
                this.grenade.setThirdBlast()
                this.blast = 3
                break;
            case dead:
                if(result === 'suicide') this.suicide = true
                else if(result === 'kill') this.grenadeDead = true
                this.blast = null
                this.grenade.isExploded = true
                break;
            case end:
                if(result) {
                    this.suicide = false
                    this.grenadeDead = false
                }
                this.grenade = null
                break;
        }
    }
}

export default Animator