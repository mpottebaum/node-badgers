import clear from '../helpers/clear.js'
import {
    mainFrame,
    grenadeFrame,
    grenadeBlastFrame,
    missFrame,
    grenadeKillFrame,
    shotFrame,
    shotKillFrame
} from '../display/frames.js'
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
            if(animator.weapon) {
                if(animator.weapon === 'shoot') {
                    shootAtBadger(u, b, animator)
                }
                if(animator.weapon === 'grenade') {
                    throwGrenade(u, b, animator)
                }
            }
            if(g.turn % 30 === 0) {
                b.makeMoves(u)
            }
            clear()
            if(animator.isShooting) {
                shotFrame(u, b, animator.shootTarget)
            } else if(animator.grenade) {
                if(animator.blast === 0) grenadeFrame(u, b, animator.grenade)
                if(animator.blast === 1) grenadeBlastFrame(u, b, animator.grenade, 1)
                if(animator.blast === 2) grenadeBlastFrame(u, b, animator.grenade, 2)
                if(animator.blast === 3) grenadeBlastFrame(u, b, animator.grenade, 3)
            } else if(animator.suicide) {
                grenadeKillFrame(u, b, true)
            } else if(animator.grenadeDead) {
                grenadeKillFrame(u, b)
            } else if(animator.shotDead) {
                shotKillFrame(u, b, true)
            } else {
                mainFrame(u, b)
            }
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