import Badger from '../models/badger.js'
import { distanceBetween } from './distanceBetween.js'
import shuffle from './shuffle.js'

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
    const badgers = generateBadgers(numBadgers)
    const current = () => badgers.filter(b => !b.deleted)
    const alive = () => badgers.filter(b => b.alive)
    const makeMoves = user => {
        alive().forEach(b => {
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
    const currentBadgersCoordinates = () => {
        return current().map(b => b.coordinates)
    }
    const deadBadgers = () => badgers.filter(b => !b.alive && !b.deleted)
    const removeDead = () => {
        current().forEach(b => {
            if(!b.alive) {
                b.delete()
            }
        })
    }
    const killBadgersInBlast = grenade => {
        const isInBlast = b => {
            return grenade.thirdBlastCoordinates.some(c => c.x === b.coordinates.x && c.y === b.coordinates.y) ||
            grenade.secondBlastCoordinates.some(c => c.x === b.coordinates.x && c.y === b.coordinates.y)
        }
        current().forEach(b => {
            if(isInBlast(b)) {
                b.alive = false
            }
        })
    }
    return {
        current,
        alive,
        makeMoves,
        currentBadgersCoordinates,
        deadBadgers,
        removeDead,
        killBadgersInBlast
    }
}

export default createBadgers