import User from "../models/user"
import Badgers from "../models/badgers"

const checkWin = (user: User, badgers: Badgers) => {
    if(user.coordinates.y === 0 && [20, 21, 22, 23].includes(user.coordinates.x)) {
        user.win = true
    } else if(badgers.current().length === 0) {
        user.win = true
    }
}

const checkAlive = (user: User, badgers: Badgers) => {
    if(badgers.killerBadger()) {
        user.alive = false
    }
}

const checkLevelEnd = (user: User, badgers: Badgers) => {
    checkWin(user, badgers)
    checkAlive(user, badgers)
    return (!user.alive || user.win)
}

export default checkLevelEnd