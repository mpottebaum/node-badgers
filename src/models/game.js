class Game {
    constructor(numBadgers) {
        this.score = 0
        this.lost = false
        this.turn = 0
        this.numBadgers = numBadgers
    }

    incTurn() {
        this.turn++
    }

    incBadgers() {
        this.numBadgers++
    }

    start() {
        this.turn = 0
    }

    gameOver() {
        this.lost = true
    }
}

module.exports = Game