import { xMax, xMin, yMax, yMin } from '../display/emptyGymHash.js'
import Coordinates from '../types/coordinates'

class Movement {
    coordinates: Coordinates;

    constructor(y: number, x: number) {
        this.coordinates = { y, x }
    }

    moveUp(numSpaces: number) {
        if((this.coordinates.y - numSpaces) < yMin) {
            this.coordinates.y = yMin
        } else {
            this.coordinates.y -= numSpaces
        }
    }

    moveDown(numSpaces: number) {
        if((this.coordinates.y + numSpaces) > yMax) {
            this.coordinates.y = yMax
        } else {
            this.coordinates.y += numSpaces
        }
    }

    moveLeft(numSpaces: number) {
        if((this.coordinates.x - (numSpaces * 2)) < xMin) {
            this.coordinates.x = xMin
        } else {
            this.coordinates.x -= numSpaces * 2
        }
    }

    moveRight(numSpaces: number) {
        if((this.coordinates.x + (numSpaces * 2)) > xMax) {
            this.coordinates.x = xMax
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
}

export default Movement