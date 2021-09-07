import Movement from './movement.js'
import {
    yDistanceBetween,
    xDistanceBetween
} from '../helpers/distanceBetween.js'

class Badger extends Movement {
    constructor(name) {
        super(10, 10)
        this.name = name
        this.pace = 2
        this.alive = true
    }

    move(user) {
        const y = yDistanceBetween(user, this)
        const x = xDistanceBetween(user, this)

        if(y === 0) {
            if(x > 0) this.moveLeft(this.pace)
            else this.moveRight(this.pace)
        } else if(x === 0) {
            if(y > 0) this.moveUp(this.pace)
            else this.moveDown(this.pace)
        } else if(y < 0 && x < 0) {
            for(let i=0; i<this.pace; i++) this.move135()
        } else if(y < 0 && x > 0) {
            for(let i=0; i<this.pace; i++) this.move225()
        } else if(y > 0 && x < 0) {
            for(let i=0; i<this.pace; i++) this.move45()
        } else {
            for(let i=0; i<this.pace; i++) this.move315()
        }
    }

    kill() {
        this.alive = false
    }

    delete() {
        this.deleted = true
    }

    startCoordinates() {
        const y = Math.round(Math.random() * 12)
        const x = Math.ceil(Math.random() * 40)
        this.coordinates = { x, y, }
    }
}

export default Badger