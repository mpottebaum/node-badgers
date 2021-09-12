import Gym from '../models/gym.js'
import { displayGym, displayWinGym } from './displayGym.js'

const displayMessage = (animator) => {
    let message = ' '
    if(animator.hasMissShots() || animator.hasMissGrenades()) {
        message = 'You missed'
    }
    let numDeadBadgers = 0
    if(animator.activeShots() && animator.hitShots()) {
        numDeadBadgers += animator.hitShots().reduce((dBs, shot) => {
            return dBs + shot.deadBadgers.length
        }, 0)
    }
    if(animator.activeGrenades() && animator.hitGrenades()) {
        numDeadBadgers += animator.hitGrenades().reduce((dBs, grenade) => {
            return dBs + grenade.deadBadgers.length
        }, 0)
    }
    if(numDeadBadgers === 1) {
        message = `You killed a badger!`
    }
    if(numDeadBadgers > 1) {
        message = `You killed ${numDeadBadgers} badgers!`
    }
    if(animator.activeGrenades().some(grenade => grenade.suicide)) {
        message = 'You blew yourself up!'
    }
    console.log(message)
}

const userInfo = user => {
    console.log(`WEAPON: ${user.weapon.toUpperCase()}`)
    console.log(`Stamina: ${user.stamina}`)
    console.log(`Grenades: ${user.grenades}`)
    console.log(`Bullets: ${user.bullets}`)
}

const frame = (user, badgers, animator) => {
    const gym = new Gym()
    gym.placePlayers(user, badgers)
    if(animator.unexplodedGrenades()) {
        gym.placeGrenades(animator.unexplodedGrenades())
    }
    if(animator.movingShots()) {
        gym.placeShots(animator.movingShots())
    }
    console.log(`LEVEL POINTS: ${user.points}`)
    displayGym(gym.hash)
    displayMessage(animator)
    userInfo(user)
}

export default frame

export const killedFrame = (user, badgers, animator) => {
    const gym = new Gym()
    gym.placePlayers(user, badgers)
    if(animator.unexplodedGrenades()) {
        gym.placeGrenades(animator.unexplodedGrenades())
    }
    if(animator.shot && animator.shot.isShooting) {
        gym.placeShot(user, animator.shot.target)
    }
    console.log(`LEVEL POINTS: ${user.points}`)
    displayGym(gym.hash)
    const killerBadger = badgers.current().find(b => b.killer)
    console.log(`The badger ${killerBadger.name} killed you`)
}

export const winFrame = (user, badgers, animator) => {
    const gym = new Gym()
    gym.placeBadgers(badgers)
    if(animator.unexplodedGrenades()) {
        gym.placeGrenades(animator.unexplodedGrenades())
    }
    if(animator.shot && animator.shot.isShooting) {
        gym.placeShot(user, animator.shot.target)
    }
    console.log(`LEVEL POINTS: ${user.points}`)
    displayWinGym(user, gym.hash)
}