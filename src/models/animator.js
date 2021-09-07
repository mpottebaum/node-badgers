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

    throwGrenade(onGrenadeBlast, onGrenadeEnd) {
        this.weapon = ''
        setTimeout(() => {
            this.grenade.fullMovement()
            setTimeout(() => {
                this.grenade.fullMovement()
                setTimeout(() => {
                    this.grenade.fullMovement()
                    setTimeout(() => {
                        this.blast = 1
                        setTimeout(() => {
                            this.grenade.setSecondBlast()
                            this.blast = 2
                            setTimeout(() => {
                                this.grenade.setThirdBlast()
                                this.blast = 3
                                const result = onGrenadeBlast(this.grenade)
                                setTimeout(() => {
                                    if(result) {
                                        if(result === 'suicide') this.suicide = true
                                        else if(result === 'kill') this.grenadeDead = true
                                        setTimeout(() => {
                                            onGrenadeEnd()
                                            this.suicide = false
                                            this.grenadeDead = false
                                        }, 1500)
                                    } 
                                    this.grenade = null
                                    this.blast = null
                                }, 500)
                            }, 500)
                        }, 400)
                    }, 250)
                }, 250)
            }, 250)
        }, 250)
    }
}

export default Animator