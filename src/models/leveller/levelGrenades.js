import LevelShots from "./levelShots.js"
import Grenade from '../grenade.js'

class LevelGrenades extends LevelShots {
    constructor() {
        super()
        this.grenades = []
    }

    createGrenade(angle) {
        const newGrenade = new Grenade(angle, 1)
        this.grenades.push(newGrenade)
    }

    processGrenades(user, badgers, turn) {
        if(this.hasActiveGrenades()) {
            if(this.newGrenades()) {
                this.newGrenades().forEach(() => user.grenades -= 1)
                this.startNewGrenades(user.coordinates, turn)
            }
            if(this.movingGrenades()) {
                this.grenadeCleanUp(user, badgers, turn)
            }
        
            this.moveGrenades(turn)
        
            if(this.hasActiveGrenades()) {
                this.killPlayersGrenades(user, badgers, turn)
            }
        }
    }

    hasActiveGrenades() {
        return this.grenades.some(g => !g.deleted)
    }

    activeGrenades() {
        return this.grenades.filter(g => !g.deleted)
    }

    newGrenades() {
        const newGrenades = this.activeGrenades().filter(g => g.isNew() && !g.deleted)
        return newGrenades.length > 0 && newGrenades
    }

    movingGrenades() {
        const moving = this.activeGrenades().filter(g => !g.deleted && g.moveTurns)
        return moving.length > 0 && moving
    }

    unexplodedGrenades() {
        const unexploded = this.activeGrenades().filter(g => !g.isExploded)
        return unexploded.length > 0 && unexploded
    }

    startNewGrenades(userCoordinates, turn) {
        for(const grenade of this.activeGrenades()) {
            if(grenade.isNew()) {
                grenade.start(userCoordinates, turn)
            }
        }
    }

    moveGrenades(turn) {
        const active = this.activeGrenades()
        for(const grenade of active) {
            grenade.moveGrenade(turn)
        }
    }

    killPlayersGrenades(user, badgers, turn) {
        for(const grenade of this.activeGrenades()) {
            if(grenade.moveTurns && (turn === grenade.moveTurns.thirdBlast)) {
                grenade.killPlayersInBlastRadius(user, badgers)
                if(grenade.deadBadgers.length > 0) {
                    this.currentDeadCount += grenade.deadBadgers.length
                    this.endTurnCurrentDead = turn + 15
                }
            }
        }
    }

    grenadeCleanUp(user, badgers, turn) {
        const moving = this.movingGrenades()
        for(const grenade of moving) {
            const { dead, end } = grenade.moveTurns
            if((turn === dead) && (grenade.deadBadgers)) {
                user.grenadeKillBadgerPoints(badgers.dead().length)
            }
            if((turn === end) && (grenade.deadBadgers && grenade.deadBadgers.length > 0)) {
                grenade.deadBadgers.forEach(b => b.delete())
            }
        }
    }

    hasMissGrenades() {
        return this.activeGrenades().some(g => g.isExploded && !g.deadBadgers)
    }

    hitGrenades() {
        const hitGrenades = this.activeGrenades().filter(grenade => grenade.isExploded && grenade.deadBadgers.length > 0)
        return hitGrenades.length > 0 && hitGrenades
    }

}

export default LevelGrenades