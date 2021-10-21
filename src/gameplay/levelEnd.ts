import clear from '../helpers/clear.js'
import inquirer from 'inquirer'
import frame from '../display/frame.js'
import sleep from '../helpers/sleep.js'
import User from '../models/user.js'
import Badgers from '../models/badgers.js'
import Game from '../models/game.js'
import Leveller from '../models/leveller/index.js'

const levelEnd = async (user: User, badgers: Badgers, game: Game, leveller: Leveller) => {
    clear()
    frame(user, badgers, leveller, user.alive)
    await sleep(1.5)
    if(!user.alive) {
        console.log('Game Over!')
        game.lost = true
    } else {
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
    return new Promise<void>(resolve => resolve())
}

export default levelEnd