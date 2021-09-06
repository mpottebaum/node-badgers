import clear from '../helpers/clear.js'
import inquirer from 'inquirer'
import { winFrame, killedFrame } from '../display/frames.js'
import createBadgers from '../helpers/createBadgers.js'
import sleep from '../helpers/sleep.js'
import User from '../models/user.js'
import levelIntro from './levelIntro.js'
import turn from './turn.js'
import checkWin from '../helpers/checkWin.js'
import checkAlive from '../helpers/checkAlive.js'

const level = async (game) => {
    const badgers = createBadgers(game.numBadgers)
    const user = new User(game.numBadgers)
    game.start()
    await levelIntro(game.numBadgers)
    while(user.alive) {
        game.incTurn()
        await turn(user, badgers, game)
        checkWin(user, badgers)
        if(user.win) {
            clear()
            winFrame(user, badgers)
            await sleep(1.5)
            break;
        }
        badgers.makeMoves(user)
        checkAlive(user, badgers)
        if(!user.alive) {
            clear()
            killedFrame(user, badgers)
            await sleep(1.5)
        }
        if(user.tired && user.isStaminaRecharged(game)) {
            user.tired = false
            user.restoreStamina()
        } else if(user.stamina < 3 && user.isStaminaRecharged(game)) {
            user.restoreStamina()
        }
    }
    clear()
    if(user.win) {
        user.survivalPoints(game.numBadgers)
        console.log('You escaped the gym!')
    } else {
        console.log('Game Over!')
        game.lost = true
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
    return new Promise(resolve => resolve())
}

export default level