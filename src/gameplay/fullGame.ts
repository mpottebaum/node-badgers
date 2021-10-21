import inquirer from 'inquirer'
import clear from '../helpers/clear.js'
import sleep from '../helpers/sleep.js'
import instructions from './instructions.js'
import Game from '../models/game.js'
import level from './level.js'

const fullGame = async () => {
    await instructions()
    const game = new Game(2)
    while(!game.lost) {
        await level(game)
        game.incBadgers()
        if(game.numBadgers > 20) {
            clear()
            console.log('CONGRATULATIONS')
            console.log('You beat BADGERS AND GYMS!')
            await sleep(2)
            break;
        }
    }
    clear()
    const { endPrompt } = await inquirer.prompt([
        {
            type: 'list',
            name: 'endPrompt',
            message: 'Would you like to play again?',
            choices: [
                'Yes',
                'No'
            ]
        }
    ])
    if(endPrompt === 'Yes') {
        fullGame()
    } else {
        process.exit()
    }
}

export default fullGame