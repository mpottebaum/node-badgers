const Movement = require('./movement')
const {
    yDistanceBetween,
    xDistanceBetween
} = require('../helpers/distanceBetween')

class Badger extends Movement {
    constructor(name) {
        super(10, 10)
        this.name = name
        this.pace = 2
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
        this.constructor.currentBadgers = this.constructor.currentBadgers.filter(b => b !== this)
    }

    startCoordinates() {
        const y = Math.round(Math.random() * 12)
        const x = Math.ceil(Math.random() * 40)
        this.coordinates = { x, y, }
    }
}

module.exports = Badger