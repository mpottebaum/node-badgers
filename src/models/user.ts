import Movement from './movement.js'
import Grenade from './grenade'
import { xMax, yMax } from '../display/emptyGymHash.js'
import Coordinates from '../types/coordinates'

class User extends Movement {
    bullets: number;
    grenades: number;
    stamina: number;
    tired: boolean;
    alive: boolean;
    win: boolean;
    points: number;
    weapon: string;

    constructor(numBadgers: number) {
        super(yMax, xMax / 2)
        this.bullets = Math.ceil(Math.sqrt(numBadgers))
        this.grenades = Math.ceil(Math.log(numBadgers)) + 2
        this.stamina = 3
        this.tired = false
        this.alive = true
        this.win = false
        this.points = 0
        this.weapon = 'grenade'
    }

    changeWeapon(weapon: string) {
        this.weapon = weapon
    }

    shoot() {
        this.bullets -= 1
    }

    killIfInBlast(grenade: Grenade) {
        const checkForCoordinateMatch = (coordinateList: Coordinates[]) => {
            return coordinateList.some(c => c.x === this.coordinates.x && c.y === this.coordinates.y)
        }
        if(checkForCoordinateMatch(grenade.thirdBlastCoordinates) || checkForCoordinateMatch(grenade.secondBlastCoordinates)) {
            return this.alive = false
        }
        return true
    }

    shootBadgerPoints() {
        this.points += 300
    }

    grenadeKillBadgerPoints(numBadgers: number) {
        this.points += (300 * (numBadgers**numBadgers))
    }

    survivalPoints(numBadgers: number) {
        this.points += (1000 * numBadgers)
        this.points += (50 * this.bullets)
        this.points += (500 * this.grenades)
    }
}

export default User
