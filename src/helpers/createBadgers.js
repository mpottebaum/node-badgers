const Badger = require('../models/badger')
const { distanceBetween } = require('./distanceBetween')
const shuffle = require('./shuffle')

const badgerNames = [
    "Balthazar",
    "Betelguese",
    "Bartholomew",
    "Balzac",
    "Blastus",
    "Bartleby",
    "Bloom",
    "Blackbeard",
    "Barnabas",
    "Beelzebub",
    "Baal",
    "Baladan",
    "Beeroth",
    "Behemoth",
    "Benjamin",
    "Bernice",
    "Bezek",
    "Buz",
    "Boanerges",
    "Boson",
]


const generateBadgers = numBadgers => {
    const names = shuffle(badgerNames).slice(0, numBadgers)
    return names.map(name => {
        const badger = new Badger(name)
        badger.startCoordinates()
        badger.alive = true
        return badger
    })
}

const createBadgers = numBadgers => {
    let badgers = generateBadgers(numBadgers)
    const makeMoves = user => {
        badgers.forEach(b => {
            if(distanceBetween(user, b) < 4) {
                b.coordinates.y = user.coordinates.y
                b.coordinates.x = user.coordinates.x
                b.killer = true
            } else {
                b.move(user)
                if(b.coordinates.y === user.coordinates.y && b.coordinates.x === user.coordinates.x) {
                    b.killer = true
                }
            }
        })
    }
    const current = () => badgers.filter(b => b.alive)
    const currentBadgersCoordinates = () => {
        return badgers.map(b => b.coordinates)
    }
    const deadBadgers = () => badgers.filter(b => !b.alive)
    const removeDead = () => {
        badgers = badgers.filter(b => b.alive)
    }
    const killBadgersInBlast = grenade => {
        const isInBlast = b => {
            return grenade.thirdBlastCoordinates.some(c => c.x === b.coordinates.x && c.y === b.coordinates.y) ||
            grenade.secondBlastCoordinates.some(c => c.x === b.coordinates.x && c.y === b.coordinates.y)
        }
        badgers.forEach(b => {
            if(isInBlast(b)) {
                b.alive = false
            }
        })
    }
    return {
        all: badgers,
        current,
        makeMoves,
        currentBadgersCoordinates,
        deadBadgers,
        removeDead,
        killBadgersInBlast
    }
}

module.exports = createBadgers