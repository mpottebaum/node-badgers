import Grenade from './grenade.js'

class Animator {
    constructor() {
        this.weapon = ''
        this.dead = false
    }

    createShot() {
        this.weapon = 'shoot'
    }

    shot(target, hit=false) {
        this.weapon = ''
        this.shootTarget = target
        setTimeout(() => {
            if(hit) {
                this.shootTarget.alive = false
                this.dead = true
                setTimeout(() => {
                    this.dead = false
                }, 1500)
            }
            this.shootTarget = null
        }, 750)
    }

    createGrenade(angle) {
        this.weapon = 'grenade'
        this.grenade = new Grenade(angle, 2)
        this.blast = 0
    }

    throwGrenade(onGrenadeEnd) {
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
                                setTimeout(() => {
                                    const result = onGrenadeEnd(this.grenade)
                                    if(result) {
                                        if(result === 'suicide') this.suicide = true
                                        else if(result === 'kill') this.dead = true
                                        setTimeout(() => {
                                            this.suicide = false
                                            this.dead = false
                                        }, 1500)
                                    } 
                                    this.grenade = null
                                    this.blast = null
                                }, 1000)
                            }, 1000)
                        }, 1000)
                    }, 500)
                }, 500)
            }, 750)
        }, 1000)
    }
}

export default Animator