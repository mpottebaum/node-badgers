import clear from '../helpers/clear.js'
import inquirer from 'inquirer'
import { winFrame, killedFrame } from '../display/frames.js'
import sleep from '../helpers/sleep.js'
import checkWin from '../helpers/checkWin.js'
import checkAlive from '../helpers/checkAlive.js'

const checkLevelEnd = async (user, badgers, game, interval) => {
    let levelEnd = false
    checkWin(user, badgers)
    checkAlive(user, badgers)
    if(!user.alive || user.win) {
        levelEnd = true
        clearInterval(interval)
        if(!user.alive) {
            clear()
            killedFrame(user, badgers)
            await sleep(1.5)
            console.log('Game Over!')
            game.lost = true
        } else {
            clear()
            winFrame(user, badgers)
            await sleep(1.5)
            clear()
            user.survivalPoints(game.numBadgers)
            console.log('You escaped the gym!')
        }
        game.score += user.points
        console.log(`Score: ${game.score}`)
        await inquirer.prompt([
            {
                type: 'list',
                name: 'instructions',
                message: 'Press Enter to continue',
                choices: [
                    'Continue'
                ]
            }
        ])
    }
    return new Promise(resolve => resolve(levelEnd))
}

export default checkLevelEnd