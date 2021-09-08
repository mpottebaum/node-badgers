import Grenade from './grenade.js'

class Animator {
    constructor() {
        this.weapon = ''
    }

    createShot() {
        this.weapon = 'shoot'
    }

    isAnimating() {
        return this.isShooting || this.shotDead || this.grenade || this.grenadeDead || this.suicide
    }

    shot(target, hit=false) {
        this.weapon = ''
        this.isShooting = true
        this.shootTarget = target
        setTimeout(() => {
            if(hit) {
                this.shootTarget.alive = false
                this.shotDead = true
                setTimeout(() => {
                    this.shootTarget.deleted = true
                    this.shotDead = false
                    this.shootTarget = null
                }, 1500)
            }
            this.isShooting = false
        }, 750)
    }

    createGrenade(angle) {
        this.weapon = 'grenade'
        this.grenade = new Grenade(angle, 2)
        this.blast = 0
    }

    moveGrenade(turn, result, onGrenadeBlast, onGrenadeEnd) {
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
                // onGrenadeBlast(this.grenade)
                break;
            case dead:
                if(result === 'suicide') this.suicide = true
                else if(result === 'kill') this.grenadeDead = true
                this.blast = null
                this.grenade.isExploded = true
                break;
            case end:
                if(result) {
                    // onGrenadeEnd()
                    this.suicide = false
                    this.grenadeDead = false
                }
                this.grenade = null
                break;
        }
    }
}

export default Animator