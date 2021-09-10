class Shot {
    constructor() {
        this.isNew = true
    }

    shoot(startTurn, target, hit=false) {
        this.target = target
        this.hit = hit
        this.moveTurns = {
            start: startTurn,
            dead: startTurn + 5,
            end: startTurn + 15,
        },
        this.isShooting = true
        this.isNew = false
    }

    moveShot(turn) {
        const {
            dead,
            end,
        } = this.moveTurns
        switch(turn) {
            case dead:
                if(this.hit) {
                    this.target = false
                    this.dead = true
                }
                this.isShooting = false
                break;
            case end:
                if(this.hit) {
                    this.target.deleted = true
                    this.dead = false
                }
                this.deleted = true
                break;
        }

    }
}

export default Shot