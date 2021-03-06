import Movement from "./movement.js"
import Badger from "./badger.js"
import Badgers from "./badgers.js"
import User from "./user.js"
import { yMax, yMin, xMax, xMin } from '../display/emptyGymHash.js'
import MoveTurns from "../types/moveTurns";
import Coordinates from "../types/coordinates";

class Shot extends Movement {
    isNew: boolean;
    deadBadgers: Badger[];
    angle: number;
    moveTurns: MoveTurns;
    isShooting: boolean;
    isMoving: boolean;
    deleted: boolean;

    constructor(angle: number) {
        super(0, 0)
        this.isNew = true
        this.deadBadgers = []
        this.angle = angle
    }

    startCoordinates = (userCoordinates: Coordinates) => {
        let { y, x } = userCoordinates
        switch(this.angle) {
            case 0:
                y -= 1
                break;
            case 90:
                x += 1
                break;
            case 180:
                y += 1
                break;
            case 270:
                x -= 1
                break;
        }
        this.coordinates = { y, x }
    }

    shoot(user: User, startTurn: number) {
        this.startCoordinates(user.coordinates)
        this.moveTurns = {
            start: startTurn,
        },
        this.isShooting = true
        this.isMoving = true
        this.isNew = false
    }

    moveShot(turn: number, badgers: Badgers) {
        const { start } = this.moveTurns
        if(turn === start) {
            return
        }
        if(turn === start + 1) {
            this.isShooting = false
        }
        if(!this.moveTurns.end) {
            if(this.angle === 0) this.coordinates.y -= 1
            else if(this.angle === 90) this.coordinates.x += 1
            else if(this.angle === 180) this.coordinates.y += 1
            else if(this.angle === 270) this.coordinates.x -= 1
            if(this.coordinates.y < yMin || this.coordinates.y > yMax || this.coordinates.x < xMin || this.coordinates.x > xMax) {
                this.isMoving = false
                this.moveTurns = {
                    ...this.moveTurns,
                    dead: turn,
                    end: turn + 10
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

    killHits(badgers: Badgers) {
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