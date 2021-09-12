import Movement from "./movement.js"
import findBestTarget from '../helpers/findBestTarget.js'

class Shot extends Movement {
    constructor() {
        super(0, 0)
        this.isNew = true
        this.deadBadgers = []
    }

    shoot(user, startTurn) {
        this.coordinates = {
            y: user.coordinates.y - 1,
            x: user.coordinates.x,
        }
        this.moveTurns = {
            start: startTurn,
        },
        this.isShooting = true
        this.isMoving = true
        this.isNew = false
    }

    moveShot(turn, badgers) {
        const { start } = this.moveTurns
        if(turn === start) {
            return
        }
        if(turn === start + 1) {
            this.isShooting = false
        }
        if(!this.moveTurns.end) {
            this.coordinates.y -= 1
            if(this.coordinates.y < 1) {
                this.isMoving = false
                this.moveTurns = {
                    ...this.moveTurns,
                    dead: turn,
                    end: turn + 15
                }
            } else {
                this.killHits(badgers)
            }
        } else {
            if(turn === this.moveTurns.end) {
                this.deadBadgers.forEach(badger => {
                    badger.delete()
                })
                this.deleted = true
            }
        }
    }

    killHits(badgers) {
        badgers.current().forEach(badger => {
            const { y, x } = badger.coordinates
            if((y === this.coordinates.y) && (x === this.coordinates.x)) {
                badger.alive = false
                this.deadBadgers.push(badger)
            }
        })
    }
}

export default Shot