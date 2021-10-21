import LevelShots from "./levelShots"
import Grenade from '../grenade'
import User from "../user";
import Badgers from "../badgers";
import Coordinates from "../../types/coordinates";

class LevelGrenades extends LevelShots {
    grenades: Grenade[];

    constructor() {
        super()
        this.grenades = []
    }

    createGrenade(angle: number) {
        const newGrenade = new Grenade(angle, 1)
        this.grenades.push(newGrenade)
    }

    processGrenades(user: User, badgers: Badgers, turn: number) {
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

    startNewGrenades(userCoordinates: Coordinates, turn: number) {
        for(const grenade of this.activeGrenades()) {
            if(grenade.isNew()) {
                grenade.start(userCoordinates, turn)
            }
        }
    }

    moveGrenades(turn: number) {
        const active = this.activeGrenades()
        for(const grenade of active) {
            grenade.moveGrenade(turn)
        }
    }

    killPlayersGrenades(user: User, badgers: Badgers, turn: number) {
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

    grenadeCleanUp(user: User, badgers: Badgers, turn: number) {
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
        const hitGrenades = this.activeGrenades().filter(grenade => grenade.isExploded && (grenade.deadBadgers && grenade.deadBadgers.length > 0))
        return hitGrenades.length > 0 && hitGrenades
    }

}

export default LevelGrenades