import emptyGymHash from '../display/emptyGymHash.js'
import Badger from './badger.js';
import Badgers from './badgers.js';
import Grenade from './grenade.js';
import Shot from './shot.js';
import User from './user.js';

class Gym {
    hash: string[][];

    constructor() {
        this.hash = emptyGymHash()
    }

    placePlayer(player: User | Badger | Grenade | Shot, symbol: string) {
        this.hash[player.coordinates.y][player.coordinates.x] = symbol
    }

    placePlayers(user: User, badgers: Badgers) {
        this.placeUser(user)
        this.placeBadgers(badgers)
    }

    placeUser(user: User) {
        if(!user.alive) this.placePlayer(user, '#')
        else this.placePlayer(user, '&')
    }

    placeBadgers(badgers: Badgers) {
        badgers.current().forEach(b => {
            if(!b.alive) this.placePlayer(b, '#')
            else this.placePlayer(b, '%')
        })
    }

    placeShot(shot: Shot) {
        if(!shot.isNew && shot.isShooting) {
            this.placePlayer(shot, '*')
        } else if(!shot.isNew && !shot.isShooting) {
            this.placePlayer(shot, '.')
        }
    }

    placeShots(shots: Shot[]) {
        shots.forEach(shot => {
            this.placeShot(shot)
        })
    }

    placeGrenade(grenade: Grenade) {
        this.placePlayer(grenade, '@')
    }

    placeGrenades(grenades: Grenade[]) {
        for(const grenade of grenades) {
            if(grenade.blast === 1) this.placeFirstBlast(grenade)
            else if(grenade.blast === 2) this.placeSecondBlast(grenade)
            else if(grenade.blast === 3) this.placeThirdBlast(grenade)
            else this.placeGrenade(grenade)
        }
    }

    placeFirstBlast(grenade: Grenade) {
        this.placePlayer(grenade, '*')
    }

    placeSecondBlast(grenade: Grenade) {
        grenade.secondBlastCoordinates.forEach(c => {
            this.hash[c.y][c.x] = '*'
        })
    }

    placeThirdBlast(grenade: Grenade) {
        this.placeSecondBlast(grenade)
        grenade.thirdNoInvisibleCoordinates.forEach(c => {
            this.hash[c.y][c.x] = '*'
        })
    }

}

export default Gym
