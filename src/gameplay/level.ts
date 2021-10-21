import clear from '../helpers/clear.js'
import frame from '../display/frame.js'
import Badgers from '../models/badgers.js'
import User from '../models/user.js'
import levelIntro from './levelIntro.js'
import keypress from 'keypress'
import checkLevelEnd from '../helpers/checkLevelEnd.js'
import Leveller from '../models/leveller/index.js'
import levelEnd from './levelEnd.js'
import Game from '../models/game'

const turnRate = 100
const turnsPerBadgerMove = 10

const level = async (game: Game) => {
    await levelIntro(game.numBadgers)
    const badgers = new Badgers(game.numBadgers)
    const user = new User(game.numBadgers)
    const leveller = new Leveller()
    game.start()

    const endLevel = new Promise<void>(resolve => {
        const levelInterval = setInterval(async () => {
            const isEndLevel = checkLevelEnd(user, badgers)
            if(isEndLevel) {
                clearInterval(levelInterval)
                process.stdin.removeListener('keypress', onKeyPress)
                await levelEnd(user, badgers, game, leveller)
                resolve()
            }
            game.incTurn()
            leveller.processWeapons(user, badgers, game.turn)
            if(game.turn % turnsPerBadgerMove === 0) badgers.makeMoves(user)
            clear()
            frame(user, badgers, leveller)
        }, turnRate);
    })
    keypress(process.stdin)
    const onKeyPress = (ch: any, key: { ctrl: boolean; name: string; }) => {
        if(key.ctrl && key.name === 'c') process.exit()
        if(key.name == 'up') user.moveUp(1)
        if(key.name == 'down') user.moveDown(1)
        if(key.name == 'left') user.moveLeft(1)
        if(key.name == 'right') user.moveRight(1)
        if(key.name === 'space') user.changeWeapon(user.weapon === 'gun' ? 'grenade' : 'gun')
        if(user.weapon === 'grenade' && user.grenades > 0) {
            if(key.name === 'q') leveller.createGrenade(315)
            if(key.name === 'w') leveller.createGrenade(0)
            if(key.name === 'e') leveller.createGrenade(45)
            if(key.name === 'd') leveller.createGrenade(90)
            if(key.name === 'c') leveller.createGrenade(135)
            if(key.name === 'x') leveller.createGrenade(180)
            if(key.name === 'z') leveller.createGrenade(225)
            if(key.name === 'a') leveller.createGrenade(270)
        }
        if(user.weapon === 'gun' && user.bullets > 0) {
            if(key.name === 'w') leveller.createShot(0)
            if(key.name === 'd') leveller.createShot(90)
            if(key.name === 'x') leveller.createShot(180)
            if(key.name === 'a') leveller.createShot(270)
        }
    }
    process.stdin.on('keypress', onKeyPress);
    process.stdin.setRawMode(true);
    process.stdin.resume();
    return endLevel
}

export default level