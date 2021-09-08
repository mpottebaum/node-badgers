import Movement from './movement.js'

const grenStartCs = {
    y: 0,
    x: 0,
}

class Grenade extends Movement {
    constructor(angle, power) {
        super(grenStartCs.y, grenStartCs.x)
        this.angle = angle
        this.power = power
        this.isExploded = false
    }

    isNew = () => {
        // const { y, x } = this.coordinates
        // return y === grenStartCs.y && x === grenStartCs.x
        return !this.moveTurns
    }

    startCoordinates = (userCoordinates) => {
        let { y, x } = userCoordinates
        if([315, 0, 45].includes(this.angle)) {
            y -= 1
        } else if([225, 180, 135].includes(this.angle)) {
            y += 1
        } else if(this.angle === 270) {
            x -= 1
        } else {
            x += 1
        }
        this.coordinates = { y, x }
    }

    start = (userCoordinates, startTurn) => {
        this.startCoordinates(userCoordinates)
        this.moveTurns = {
            start: startTurn,
            first: startTurn + 3,
            second: startTurn + 6,
            third: startTurn + 9,
            firstBlast: startTurn + 12,
            secondBlast: startTurn + 16,
            thirdBlast: startTurn + 21,
            dead: startTurn + 26,
            end: startTurn + 41,
        }
    }

    setSecondBlast = () => {
        const { y, x } = this.coordinates
        const yCs = [ y, y+1, y-1 ]
        const xCs1 = [ x, x+1, x-1 ]
        const xCs2 = [ x+2, x-2 ]
        const blast = []
        xCs1.forEach(xC => {
            yCs.forEach(yC => blast.push({ y: yC, x: xC }))
        })
        xCs2.forEach(xC => blast.push({ y, x: xC }))
        this.secondBlastCoordinates = blast.filter(c => {
            return c.y >= 0 && c.y <= 24 && c.x > 0 && c.x <= 40
        })
    }

    setThirdBlast = () => {
        const { y, x } = this.coordinates
        const yCs2 = [ y+1, y-1 ]
        const yCs3 = [ y+2, y-2 ]
        const xCs1 = [ x+3, x-3 ]
        const xCs2 = [ x+2, x-2 ]
        const xCs3 = [ x, x+1, x-1 ]
        const blast = []
        xCs1.forEach(xC => blast.push({ y, x: xC }))
        xCs2.forEach(xC => {
            yCs2.forEach(yC => blast.push({ y: yC, x: xC }))
        })
        xCs3.forEach(xC => {
            yCs3.forEach(yC => blast.push({ y: yC, x: xC }))
        })
        xCs1.forEach(xC => {
            yCs3.forEach(yC => blast.push({ y: yC, x: xC }))
        })
        xCs1.forEach(xC => {
            yCs2.forEach(yC => blast.push({ y: yC, x: xC }))
        })
        xCs2.forEach(xC => {
            yCs3.forEach(yC => blast.push({ y: yC, x: xC }))
        })
        const minusOutOfBounds = blast.filter(c => {
            return c.y >= 0 && c.y <= 24 && c.x > 0 && c.x <= 40
        })
        this.thirdBlastCoordinates = minusOutOfBounds
        this.thirdNoInvisibleCoordinates = minusOutOfBounds.filter(c => {
            return (
                !([(y + 1), (y - 1)].includes(c.y) && [(x + 3), (x - 3)].includes(c.x)) &&
                !([(y + 2), (y - 2)].includes(c.y) && [(x + 2), (x - 2)].includes(c.x))
            )
        })
    }

    checkAngleAndAdjust = () => {
        switch(this.angle) {
            case 0:
                if(this.coordinates.y === 0) {
                    this.angle = 180
                }
                break;
            case 45:
                if(this.coordinates.y === 0 && grenade.coordinates.x === 40) {
                    this.angle = 225
                } else if (this.coordinates.y === 0) {
                    this.angle = 135
                } else if(this.coordinates.x === 40) {
                    this.angle = 315
                }
                break;
            case 90:
                if (this.coordinates.x === 40) {
                    this.angle = 270
                }
                break;
            case 135:
                if(this.coordinates.y == 24 && grenade.coordinates.x == 40) {
                    this.angle = 315
                } else if(this.coordinates.y == 24) {
                    this.angle = 45
                } else if(this.coordinates.x == 40) {
                    this.angle = 225
                }
                break;
            case 180:
                if(this.coordinates.y === 24) {
                    this.angle = 0
                }
                break;
            case 225:
                if(this.coordinates.y === 24 && grenade.coordinates.x === 1) {
                    this.angle = 45
                } else if(this.coordinates.y === 24) {
                    this.angle = 315
                } else if(this.coordinates.x === 1) {
                    this.angle = 135
                }
                break;
            case 270:
                if(this.coordinates.x < 3) {
                    this.angle = 90
                }
                break;
            case 315:
                if(this.coordinates.y === 0 && grenade.coordinates.x === 1) {
                    this.angle = 135
                } else if(this.coordinates.y === 0) {
                    this.angle = 225
                } else if(this.coordinates.x === 1) {
                    this.angle = 45
                }
                break;
        }
    }

    singleMovement = () => {
        this.checkAngleAndAdjust()
        switch(this.angle) {
            case 0:
                this.moveUp(1)
                break;
            case 45:
                this.move45()
                break;
            case 90:
                this.moveRight(1)
                break;
            case 135:
                this.move135()
                break;
            case 180:
                this.moveDown(1)
                break;
            case 225:
                this.move225()
                break;
            case 270:
                this.moveLeft(1)
                break;
            case 315:
                this.move315()
                break;
        }
    }
    
    fullMovement = () => {
        for(let i=0; i < this.power; i++) this.singleMovement()
    }

    killPlayersInBlastRadius = (user, badgers) => {
        badgers.killBadgersInBlast(this)
        user.killIfInBlast(this)
    }
}

export default Grenade