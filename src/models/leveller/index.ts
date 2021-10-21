import LevelGrenades from "./levelGrenades";
import User from "../user";
import Badgers from "../badgers";

class Leveller extends LevelGrenades {
    currentDeadCount: number;
    endTurnCurrentDead: number;

    constructor() {
        super()
        this.currentDeadCount = 0
        this.endTurnCurrentDead = 0
    }

    processWeapons(user: User, badgers: Badgers, turn: number) {
        this.processShots(user, badgers, turn)
        this.processGrenades(user, badgers, turn)
        if(turn === this.endTurnCurrentDead) {
            this.currentDeadCount = 0
        }
    }
}

export default Leveller