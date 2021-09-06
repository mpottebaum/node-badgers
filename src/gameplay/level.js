import clear from '../helpers/clear.js'
import { mainFrame, shotFrame } from '../display/frames.js'
import createBadgers from '../helpers/createBadgers.js'
import User from '../models/user.js'
import levelIntro from './levelIntro.js'
import keypress from 'keypress'
import checkLevelEnd from './checkLevelEnd.js'
import shootAtBadger from './shootAtBadger.js'
import throwGrenade from './throwGrenade.js'
import findBestTarget from '../helpers/findBestTarget.js'
import Animator from '../models/animator.js'

const level = async (game) => {
    const badgers = createBadgers(game.numBadgers)
    const user = new User(game.numBadgers)
    game.start()
    await levelIntro(game.numBadgers)
    const animator = new Animator()

    const endLevel = new Promise(resolve => {
        const gameClock = setInterval(async (u, b, g) => {
            const isEndLevel = await checkLevelEnd(u, b, g, gameClock)
            if(isEndLevel) resolve()
            g.incTurn()
            if(animator.weapon) {
                if(animator.weapon === 'shoot') {
                    shootAtBadger(u, b, animator)
                }
            }
            if(g.turn % 30 === 0) {
                b.makeMoves(u)
            }
            clear()
            if(animator.shootTarget) {
                shotFrame(u, b, animator.shootTarget)
            } else {
                mainFrame(u, b)
            }
        }, 100, user, badgers, game);
    })
    keypress(process.stdin)
    process.stdin.on('keypress', (ch, key) => {
        if(key.ctrl && key.name === 'c') process.exit()
        if (key.name == 'w') user.moveUp(1)
        if (key.name == 's') user.moveDown(1)
        if (key.name == 'a') user.moveLeft(1)
        if (key.name == 'd') user.moveRight(1)
        if(key.name === 'space') animator.weapon = 'shoot'
        // if(key.name === 'p') grenade = true
    });
    process.stdin.setRawMode(true);
    process.stdin.resume();
    return endLevel
}

export default level