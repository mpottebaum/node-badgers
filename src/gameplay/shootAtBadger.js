import { distanceBetween } from '../helpers/distanceBetween.js'
import findBestTarget from '../helpers/findBestTarget.js'
import { shotAni } from '../display/weaponsAnimations.js'

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

export default shootAtBadger