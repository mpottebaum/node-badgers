import clear from '../helpers/clear.js'
import sleep from '../helpers/sleep.js'
import findCloseBadgers from '../helpers/findCloseBadgers.js'
import { mainFrame } from '../display/frames.js'
import userTurn from './userTurn.js'

const turn = async (user, badgers, game) => {
    const closeBadgers = findCloseBadgers(user, badgers)
    if(closeBadgers.length > 0) {
        clear()
        if(closeBadgers === 1) {
            console.log('A badger is near')
        } else {
            console.log('There are badgers approaching')
        }
        await sleep(1.5)
    }
    clear()
    mainFrame(user, badgers)
    await userTurn(user, badgers, game)
    return new Promise(resolve => resolve())
}

export default turn