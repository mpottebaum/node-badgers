import { distanceBetween } from '../helpers/distanceBetween.js'
import findBestTarget from '../helpers/findBestTarget.js'

const shootAtBadger = (user, badgers, animator) => {
    const target = findBestTarget(user, badgers)
    const oddsOfHit = Math.round(distanceBetween(user, target))
    const randNum = Math.round(Math.random() * oddsOfHit)
    const isKill = randNum === 0
    animator.shot(target, isKill)
    user.shoot()
    if(isKill) {
        user.shootBadgerPoints()
    }
    return target
}

export default shootAtBadger