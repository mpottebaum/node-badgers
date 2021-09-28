import LevelGrenades from "./levelGrenades.js";

class Leveller extends LevelGrenades {
    constructor() {
        super()
        this.currentDeadCount = 0
        this.endTurnCurrentDead = 0
    }

    isAnimating() {
        return this.hasActiveShots() || this.hasActiveGrenades()
    }

    processWeapons(user, badgers, turn) {
        this.processShots(user, badgers, turn)
        this.processGrenades(user, badgers, turn)
        if(turn === this.endTurnCurrentDead) {
            this.currentDeadCount = 0
        }
    }
}

export default Leveller