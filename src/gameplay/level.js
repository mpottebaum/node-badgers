import clear from '../helpers/clear.js'
import inquirer from 'inquirer'
import { winFrame, killedFrame, mainFrame } from '../display/frames.js'
import createBadgers from '../helpers/createBadgers.js'
import sleep from '../helpers/sleep.js'
import User from '../models/user.js'
import levelIntro from './levelIntro.js'
import turn from './turn.js'
import checkWin from '../helpers/checkWin.js'
import checkAlive from '../helpers/checkAlive.js'
import keypress from 'keypress'

const level = async (game) => {
    const badgers = createBadgers(game.numBadgers)
    const user = new User(game.numBadgers)
    game.start()
    await levelIntro(game.numBadgers)
    const endLevel = new Promise(resolve => {
        const badgersClock = setInterval((u, b) => {
            b.makeMoves(u)
        }, 3000, user, badgers);
        const gameClock = setInterval(async (u, b, g) => {
            checkWin(u, b)
            checkAlive(u, b)
            if(!u.alive || u.win) {
                clearInterval(gameClock)
                clearInterval(badgersClock)
                if(!u.alive) {
                    clear()
                    killedFrame(u, b)
                    await sleep(1.5)
                    console.log('Game Over!')
                    game.lost = true
                } else {
                    clear()
                    winFrame(u, b)
                    await sleep(1.5)
                    clear()
                    u.survivalPoints(g.numBadgers)
                    console.log('You escaped the gym!')
                }
                g.score += u.points
                console.log(`Score: ${g.score}`)
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
                resolve()
            }
            g.incTurn()
            clear()
            mainFrame(u, b)
        }, 100, user, badgers, game);
    })
    keypress(process.stdin)
    process.stdin.on('keypress', (ch, key) => {
        if(key.ctrl && key.name === 'c') process.exit()
        if (key.name == 'w') user.moveUp(1)
        if (key.name == 's') user.moveDown(1)
        if (key.name == 'a') user.moveLeft(1)
        if (key.name == 'd') user.moveRight(1)
    });
    process.stdin.setRawMode(true);
    process.stdin.resume();
    return endLevel
}

export default level