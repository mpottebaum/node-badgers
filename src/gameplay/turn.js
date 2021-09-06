const clear = require('clear')
const sleep = require('../helpers/sleep')
const findCloseBadgers = require('../helpers/findCloseBadgers')
const { mainFrame } = require('../display/frames')
const userTurn = require('./userTurn')

const turn = async (user, badgers, game) => {
    const closeBadgers = findCloseBadgers(user, badgers)
    if(closeBadgers.length > 0) {
        clear()
        if(closeBadgers === 1) {
            console.log('A badger is near')
        } else {
            console.log('There are badgers approaching')
        }
        await sleep(1.5)
    }
    clear()
    mainFrame(user, badgers)
    await userTurn(user, badgers, game)
    return new Promise(resolve => resolve())
}

module.exports = turn