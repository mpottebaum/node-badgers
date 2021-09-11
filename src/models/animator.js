import Grenade from './grenade.js'
import Shot from './shot.js'

import { distanceBetween } from '../helpers/distanceBetween.js'
import findBestTarget from '../helpers/findBestTarget.js'

class Animator {
    constructor() {
        this.grenades = []
    }

    isAnimating() {
        return this.hasActiveShot() || this.hasActiveGrenades()
    }

    processWeapons(user, badgers, turn) {
        this.processShot(user, badgers, turn)
        this.processGrenades(user, badgers, turn)
    }

    hasActiveShot() {
        return this.shot && !this.shot.deleted
    }
    
    createShot() {
        this.shot = new Shot()
    }

    processShot(user, badgers, turn) {
        if(this.shot && !this.shot.deleted) {
            if(this.shot.isNew) {
                const target = findBestTarget(user, badgers)
                const oddsOfHit = Math.round(distanceBetween(user, target))
                const randNum = Math.round(Math.random() * oddsOfHit)
                const isKill = randNum === 0
                this.shot.shoot(turn, target, isKill)
                user.shoot()
            }
            if(turn === this.shot.moveTurns.dead) {
                user.shootBadgerPoints()
            }
            this.shot.moveShot(turn)
        }
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
            if((turn === end) && (grenade.deadBadgers && grenade.deadBadgers.length > 0)) {
                grenade.deadBadgers.forEach(b => b.delete())
            }
        }
    }

    hasMissGrenades() {
        return this.grenades.some(g => g.isExploded && !g.deadBadgers)
    }
}

export default Animator