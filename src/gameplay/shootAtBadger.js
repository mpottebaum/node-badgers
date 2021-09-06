const { distanceBetween } = require('../helpers/distanceBetween')
const findBestTarget = require('../helpers/findBestTarget')
const { shotAni } = require('../display/weaponsAnimations')

const shootAtBadger = async (user, badgers) => {
    const target = findBestTarget(user, badgers)
    const oddsOfHit = Math.round(distanceBetween(user, target))
    const randNum = Math.round(Math.random() * oddsOfHit)
    if(randNum === 0) {
        target.alive = false
        await shotAni(user, badgers, target, true)
        user.shootBadgerPoints
        target.kill()
    } else {
        await shotAni(user, badgers, target, false)
    }
    return new Promise(resolve => resolve())
}

module.exports = shootAtBadger