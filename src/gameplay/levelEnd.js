import clear from '../helpers/clear.js'
import inquirer from 'inquirer'
import frame from '../display/frame.js'
import sleep from '../helpers/sleep.js'

const levelEnd = async (user, badgers, game, animator) => {
    clear()
    frame(user, badgers, animator, user.alive)
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
    return new Promise(resolve => resolve(levelEnd))
}

export default levelEnd