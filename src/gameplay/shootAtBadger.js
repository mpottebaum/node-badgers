import { distanceBetween } from '../helpers/distanceBetween.js'
import findBestTarget from '../helpers/findBestTarget.js'

const shootAtBadger = (user, badgers, animator) => {
    const target = findBestTarget(user, badgers)
    const oddsOfHit = Math.round(distanceBetween(user, target))
    const randNum = Math.round(Math.random() * oddsOfHit)
    const isKill = randNum === 0
    animator.shot(target, isKill)
    if(isKill) {
        // target.alive = false
        // await shotAni(user, badgers, target, true)
        user.shootBadgerPoints()
        // target.kill()
    }
    // } else {
    //     await shotAni(user, badgers, target, false)
    // }
    return target
}

export default shootAtBadger