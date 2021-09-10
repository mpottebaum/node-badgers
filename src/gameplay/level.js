import clear from '../helpers/clear.js'
import frame from '../display/frames.js'
import createBadgers from '../helpers/createBadgers.js'
import User from '../models/user.js'
import levelIntro from './levelIntro.js'
import keypress from 'keypress'
import checkLevelEnd from './checkLevelEnd.js'
import shootAtBadger from './shootAtBadger.js'
import throwGrenade from './throwGrenade.js'
import Animator from '../models/animator.js'
import levelEnd from './levelEnd.js'

const level = async (game) => {
    const badgers = createBadgers(game.numBadgers)
    const user = new User(game.numBadgers)
    game.start()
    await levelIntro(game.numBadgers)
    const animator = new Animator()

    const endLevel = new Promise(resolve => {
        const gameClock = setInterval(async (u, b, g) => {
            const isEndLevel = checkLevelEnd(u, b)
            if(isEndLevel && !animator.isAnimating()) {
                clearInterval(gameClock)
                process.stdin.removeListener('keypress', onKeyPress)
                await levelEnd(u, b, g)
                resolve()
            }
            g.incTurn()
            if(animator.shot) {
                shootAtBadger(u, b, animator, g.turn)
            }
            if(animator.hasActiveGrenades()) {
                throwGrenade(u, b, animator, g.turn)
            }
            if(g.turn % 30 === 0) {
                b.makeMoves(u)
            }
            clear()
            frame(user, badgers, animator)
        }, 100, user, badgers, game);
    })
    keypress(process.stdin)
    const onKeyPress = (ch, key) => {
        if(key.ctrl && key.name === 'c') process.exit()
        if (key.name == 'up') user.moveUp(1)
        if (key.name == 'down') user.moveDown(1)
        if (key.name == 'left') user.moveLeft(1)
        if (key.name == 'right') user.moveRight(1)
        if(key.name === 'space' && user.bullets > 0) animator.createShot()
        if(key.name === 'q' && user.grenades > 0) animator.createGrenade(315)
        if(key.name === 'w' && user.grenades > 0) animator.createGrenade(0)
        if(key.name === 'e' && user.grenades > 0) animator.createGrenade(45)
        if(key.name === 'd' && user.grenades > 0) animator.createGrenade(90)
        if(key.name === 'c' && user.grenades > 0) animator.createGrenade(135)
        if(key.name === 'x' && user.grenades > 0) animator.createGrenade(180)
        if(key.name === 'z' && user.grenades > 0) animator.createGrenade(225)
        if(key.name === 'a' && user.grenades > 0) animator.createGrenade(270)
    }
    process.stdin.on('keypress', onKeyPress);
    process.stdin.setRawMode(true);
    process.stdin.resume();
    return endLevel
}

export default level