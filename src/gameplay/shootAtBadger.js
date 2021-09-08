import { distanceBetween } from '../helpers/distanceBetween.js'
import findBestTarget from '../helpers/findBestTarget.js'

const shootAtBadger = (user, badgers, animator, turn) => {
    if(animator.shot.isNew) {
        const target = findBestTarget(user, badgers)
        const oddsOfHit = Math.round(distanceBetween(user, target))
        const randNum = Math.round(Math.random() * oddsOfHit)
        const isKill = randNum === 0
        animator.shoot(turn, target, isKill)
        user.shoot()
    }
    if(turn === animator.shot.moveTurns.dead) {
        user.shootBadgerPoints()
    }
    animator.moveShot(turn)
}

export default shootAtBadger