import Badger from './badger.js'
import { distanceBetween } from '../helpers/distanceBetween.js'
import shuffle from '../helpers/shuffle.js'

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

class Badgers {
    constructor(numBadgers) {
        this.badgers = this.generateBadgers(numBadgers)
    }
    
    generateBadgers = numBadgers => {
        const names = shuffle(badgerNames).slice(0, numBadgers)
        return names.map(name => {
            const badger = new Badger(name)
            badger.startCoordinates()
            badger.alive = true
            return badger
        })
    }
    
    current = () => this.badgers.filter(b => !b.deleted)
    
    alive = () => this.badgers.filter(b => b.alive)

    dead = () => this.badgers.filter(b => !b.alive && !b.deleted)

    killerBadger = () => this.badgers.find(b => b.killer)

    makeMoves = user => {
        this.alive().forEach(b => {
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

    currentBadgersCoordinates = () => {
        return this.current().map(b => b.coordinates)
    }

    removeDead = () => {
        this.current().forEach(b => {
            if(!b.alive) {
                b.delete()
            }
        })
    }

    killBadgersInBlast = grenade => {
        const deadBadgers = []
        this.current().forEach(b => {
            if(b.isInBlast(grenade)) {
                b.alive = false
                deadBadgers.push(b)
            }
        })

        return deadBadgers.length > 0 && deadBadgers
    }
}

export default Badgers