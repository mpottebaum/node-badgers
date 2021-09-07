import { emptyGymHash } from '../display/gymArt.js'
import { yDistanceBetween } from '../helpers/distanceBetween.js'

class GameGym {
    constructor() {
        this.hash = emptyGymHash()
    }

    placePlayer(player, symbol) {
        this.hash[player.coordinates.y][player.coordinates.x] = symbol
    }

    placePlayers(user, badgers) {
        this.placePlayer(user, '&')
        this.placeBadgers(badgers)
    }

    placeBadgers(badgers) {
        badgers.current().forEach(b => {
            this.placePlayer(b, '%')
        })
    }

    placeShot(user, target) {
        const yDistance = yDistanceBetween(user, target)
        const y = yDistance > 0 ? user.coordinates.y + 1 : user.coordinates.y - 1
        this.hash[y][user.coordinates.x] = '*'
    }

    placePlayersWithDead(user, badgers) {
        if(!user.alive) this.placePlayer(user, '#')
        else this.placePlayer(user, '&')
        badgers.current().forEach(b => {
            if(!b.alive) this.placePlayer(b, '#')
            else this.placePlayer(b, '%')
        })
    }

    placeGrenade(grenade) {
        this.placePlayer(grenade, '@')
    }

    placeFirstBlast(grenade) {
        this.placePlayer(grenade, '*')
    }

    placeSecondBlast(grenade) {
        grenade.secondBlastCoordinates.forEach(c => {
            this.hash[c.y][c.x] = '*'
        })
    }

    placeThirdBlast(grenade) {
        this.placeSecondBlast(grenade)
        grenade.thirdNoInvisibleCoordinates.forEach(c => {
            this.hash[c.y][c.x] = '*'
        })
    }

}

export default GameGym
