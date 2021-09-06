class Movement {
    constructor(y, x) {
        this.coordinates = { y, x }
    }

    moveUp(numSpaces) {
        if((this.coordinates.y - numSpaces) < 0) {
            this.coordinates.y = 0
        } else {
            this.coordinates.y -= numSpaces
        }
    }

    moveDown(numSpaces) {
        if((this.coordinates.y + numSpaces) > 24) {
            this.coordinates.y = 24
        } else {
            this.coordinates.y += numSpaces
        }
    }

    moveLeft(numSpaces) {
        if((this.coordinates.x - (numSpaces * 2)) < 1) {
            this.coordinates.x = 1
        } else {
            this.coordinates.x -= numSpaces * 2
        }
    }

    moveRight(numSpaces) {
        if((this.coordinates.x + (numSpaces * 2)) > 40) {
            this.coordinates.x = 40
        } else {
            this.coordinates.x += numSpaces * 2
        }
    }

    move45() {
        this.moveUp(1)
        this.moveRight(0.5)
    }

    move135() {
        this.moveDown(1)
        this.moveRight(0.5)
    }

    move225() {
        this.moveDown(1)
        this.moveLeft(0.5)
    }

    move315() {
        this.moveUp(1)
        this.moveLeft(0.5)
    }

    determineMovementOptions() {
        const options = []
        if(this.coordinates.y > 0) options.push('Up')
        if(this.coordinates.x > 1) options.push('Left')
        if(this.coordinates.x < 40) options.push('Right')
        if(this.coordinates.y < 24) options.push('Down')
        return options
    }
}

export default Movement