import clear from '../helpers/clear.js'
import frame from '../display/frame.js'
import createBadgers from '../helpers/createBadgers.js'
import User from '../models/user.js'
import levelIntro from './levelIntro.js'
import keypress from 'keypress'
import checkLevelEnd from '../helpers/checkLevelEnd.js'
import Animator from '../models/animator.js'
import levelEnd from './levelEnd.js'

const turnRate = 100
const turnsPerBadgerMove = 10

const level = async (game) => {
    await levelIntro(game.numBadgers)
    const badgers = createBadgers(game.numBadgers)
    const user = new User(game.numBadgers)
    const animator = new Animator()
    game.start()

    const endLevel = new Promise(resolve => {
        const levelInterval = setInterval(async () => {
            const isEndLevel = checkLevelEnd(user, badgers)
            if(isEndLevel) {
                clearInterval(levelInterval)
                process.stdin.removeListener('keypress', onKeyPress)
                await levelEnd(user, badgers, game, animator)
                resolve()
            }
            game.incTurn()
            animator.processWeapons(user, badgers, game.turn)
            if(game.turn % turnsPerBadgerMove === 0) badgers.makeMoves(user)
            clear()
            frame(user, badgers, animator)
        }, turnRate);
    })
    keypress(process.stdin)
    const onKeyPress = (ch, key) => {
        if(key.ctrl && key.name === 'c') process.exit()
        if(key.name == 'up') user.moveUp(1)
        if(key.name == 'down') user.moveDown(1)
        if(key.name == 'left') user.moveLeft(1)
        if(key.name == 'right') user.moveRight(1)
        if(key.name === 'space') user.changeWeapon(user.weapon === 'gun' ? 'grenade' : 'gun')
        if(user.weapon === 'grenade' && user.grenades > 0) {
            if(key.name === 'q') animator.createGrenade(315)
            if(key.name === 'w') animator.createGrenade(0)
            if(key.name === 'e') animator.createGrenade(45)
            if(key.name === 'd') animator.createGrenade(90)
            if(key.name === 'c') animator.createGrenade(135)
            if(key.name === 'x') animator.createGrenade(180)
            if(key.name === 'z') animator.createGrenade(225)
            if(key.name === 'a') animator.createGrenade(270)
        }
        if(user.weapon === 'gun' && user.bullets > 0) {
            if(key.name === 'w') animator.createShot(0)
            if(key.name === 'd') animator.createShot(90)
            if(key.name === 'x') animator.createShot(180)
            if(key.name === 'a') animator.createShot(270)
        }
    }
    process.stdin.on('keypress', onKeyPress);
    process.stdin.setRawMode(true);
    process.stdin.resume();
    return endLevel
}

export default level