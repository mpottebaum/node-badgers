import Shot from '../shot.js'

class LevelShots {
    constructor() {
        this.shots = []
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
            if(this.shotsAtDeadTurn(turn)) {
                this.shotsAtDeadTurn(turn).forEach(shot => {
                    if(shot.deadBadgers.length > 0) {
                        shot.deadBadgers.forEach(() => user.shootBadgerPoints())
                        this.currentDeadCount += shot.deadBadgers.length
                        this.endTurnCurrentDead = turn + 15
                    }
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

}

export default LevelShots