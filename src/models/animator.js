import Grenade from './grenade.js'

class Animator {
    constructor() {
        this.grenades = []
    }

    isAnimating() {
        return this.shot || this.grenade
    }
    
    createShot() {
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
        const newGrenade = new Grenade(angle, 2)
        this.grenades.push(newGrenade)
        this.blast = 0
    }


    hasGrenadeDead() {
        return this.grenades.some(g => g.suicide || g.hasDead())
    }

    hasActiveGrenades() {
        return this.grenades.some(g => !g.deleted)
    }

    activeGrenades() {
        return this.grenades.filter(g => !g.deleted)
    }

    newGrenades() {
        const newGrenades = this.grenades.filter(g => g.isNew() && !g.deleted)
        return newGrenades.length > 0 && newGrenades
    }

    movingGrenades() {
        const moving = this.grenades.filter(g => !g.deleted && g.moveTurns)
        return moving.length > 0 && moving
    }

    unexplodedGrenades() {
        const unexploded = this.grenades.filter(g => !g.isExploded)
        return unexploded.length > 0 && unexploded
    }

    startNewGrenades(userCoordinates, turn) {
        for(const grenade of this.grenades) {
            if(grenade.isNew()) {
                grenade.start(userCoordinates, turn)
            }
        }
    }

    moveGrenade(turn, grenade) {
        const {
            first,
            second,
            third,
            firstBlast,
            secondBlast,
            thirdBlast,
            dead,
            end,
        } = grenade.moveTurns
        switch(turn) {
            case first:
                grenade.fullMovement()
                break;
            case second:
                grenade.fullMovement()
                break;
            case third:
                grenade.fullMovement()
                break;
            case firstBlast:
                grenade.setFirstBlast()
                break;
            case secondBlast:
                grenade.setSecondBlast()
                break;
            case thirdBlast:
                grenade.setThirdBlast()
                break;
            case dead:
                grenade.blast = null
                grenade.isExploded = true
                break;
            case end:
                grenade.deleted = true
                break;
        }
    }

    moveGrenades(turn) {
        const active = this.activeGrenades()
        console.log('active grenades', active)
        for(const grenade of active) {
            this.moveGrenade(turn, grenade)
        }
    }

    killPlayersGrenades(user, badgers, turn) {
        for(const grenade of this.activeGrenades()) {
            if(grenade.moveTurns && (turn === grenade.moveTurns.thirdBlast)) {
                grenade.killPlayersInBlastRadius(user, badgers)
            }
        }
    }

    grenadeCleanUp(user, badgers, turn) {
        const moving = this.movingGrenades()
        for(const grenade of moving) {
            const { dead, end } = grenade.moveTurns
            if((turn === dead) && (grenade.deadBadgers)) {
                user.grenadeKillBadgerPoints(badgers.deadBadgers().length)
            }
            if((turn === end) && badgers.deadBadgers().length > 0) {
                badgers.removeDead()
            }
        }
    }

    hasMissGrenades() {
        return this.grenades.some(g => g.isExploded && !g.deadBadgers)
    }
}

export default Animator