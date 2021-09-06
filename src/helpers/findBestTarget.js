const findCloseBadgers = require('./findCloseBadgers')
const { distanceBetween } = require('./distanceBetween')

const yDistanceNoAbs = (user, badger) => badger.coordinates.y - user.coordinates.y

const badgersAhead = (user, closeBadgers) => {
    const badgers = closeBadgers.filter(b => yDistanceNoAbs(user, b) > 0)
    return badgers.length > 0 && badgers
}

const badgersLateral = (user, closeBadgers) => {
    const badgers = closeBadgers.filter(b => yDistanceNoAbs(user, b) === 0)
    return badgers.length > 0 && badgers
}

const anyBestBadgers = (user, closeBadgers) => badgersAhead(user, closeBadgers) || badgersLateral(user, closeBadgers)

const findClosestBadger = (user, badgers) => {
    return badgers.reduce((closest, b) => {
        return distanceBetween(user, b) < distanceBetween(user, closest) ? b : closest
    })
}

const findBestTarget = (user, badgers) => {
    const closeBadgers = findCloseBadgers(user, badgers)
    let targets = []
    if(closeBadgers.length > 1 && anyBestBadgers(user, closeBadgers)) {
        const bsAhead = badgersAhead(user, closeBadgers)
        const bsLateral = badgersLateral(user, closeBadgers)
        if(bsAhead) {
            bsAhead.forEach(b => targets.push(b))
        }
        if(bsLateral) {
            bsLateral.forEach(b => targets.push(b))
        }
    } else {
        targets = badgers.all
    }
    return findClosestBadger(user, targets)
}

module.exports = findBestTarget
