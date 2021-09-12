import Grenade from './grenade.js'
import Shot from './shot.js'

class Animator {
    constructor() {
        this.grenades = []
        this.shots = []
    }

    isAnimating() {
        return this.hasActiveShots() || this.hasActiveGrenades()
    }

    processWeapons(user, badgers, turn) {
        this.processShots(user, badgers, turn)
        this.processGrenades(user, badgers, turn)
    }

    hasActiveShots() {
        return this.shots.some(s => !s.deleted)
    }

    activeShots() {
        return this.shots.filter(s => !s.deleted)
    }
    
    createShot(angle) {
        const newShot = new Shot(angle)
        this.shots.push(newShot)
    }

    processShots(user, badgers, turn) {
        if(this.hasActiveShots()) {
            if(this.newShots()) {
                this.newShots().forEach(shot => {
                    shot.shoot(user, turn)
                    user.shoot()
                })
            }
            this.activeShots().forEach(shot => {
                shot.moveShot(turn, badgers)
            })
            if(this.shotsAtDeadTurn()) {
                this.shotsAtDeadTurn().forEach(() => {
                    user.shootBadgerPoints()
                })
            }
        }
    }
    
    newShots() {
        const newShots = this.shots.filter(s => s.isNew)
        return newShots.length > 0 && newShots
    }

    shotsAtDeadTurn(turn) {
        const shots = this.activeShots().filter(s => (s.moveTurns && s.moveTurns.dead) && (s.moveTurns.dead === turn))
        return shots.length > 0 && shots
    }


    shootingShots() {
        const shootingShots = this.activeShots().filter(s => s.isShooting)
        return shootingShots.length > 0 && shootingShots
    }
    
    movingShots() {
        const movingShots = this.activeShots().filter(s => s.isMoving)
        return movingShots.length > 0 && movingShots
    }

    hitShots() {
        const hitShots = this.activeShots().filter(shot => shot.deadBadgers.length > 0)
        return hitShots.length > 0 && hitShots
    }

    hasMissShots() {
        return this.activeShots().some(shot => (shot.moveTurns && shot.moveTurns.dead) && (shot.deadBadgers.length === 0))
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
        return this.activeGrenades().some(g => g.isExploded && !g.deadBadgers)
    }

    hitGrenades() {
        const hitGrenades = this.activeGrenades().filter(grenade => grenade.isExploded && grenade.deadBadgers.length > 0)
        return hitGrenades.length > 0 && hitGrenades
    }
}

export default Animator