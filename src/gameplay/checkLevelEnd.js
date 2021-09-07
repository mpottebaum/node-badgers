import checkWin from '../helpers/checkWin.js'
import checkAlive from '../helpers/checkAlive.js'

const checkLevelEnd = (user, badgers) => {
    checkWin(user, badgers)
    checkAlive(user, badgers)
    return (!user.alive || user.win)
}

export default checkLevelEnd