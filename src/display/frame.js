import Gym from '../models/gym.js'
import { displayGym, displayWinGym } from './displayGym.js'

const userInfo = user => {
    console.log(`WEAPON: ${user.weapon.toUpperCase()}`)
    console.log(`Stamina: ${user.stamina}`)
    console.log(`Grenades: ${user.grenades}`)
    console.log(`Bullets: ${user.bullets}`)
}

const displayDash = (user, badgers, animator) => {
    let message = ' '
    if(animator.hasMissShots() || animator.hasMissGrenades()) {
        message = 'You missed'
    }
    if(animator.currentDeadCount === 1) {
        message = `You killed a badger!`
    }
    if(animator.currentDeadCount > 1) {
        message = `You killed ${animator.currentDeadCount} badgers!`
    }
    if(animator.activeGrenades().some(grenade => grenade.suicide)) {
        console.log('You blew yourself up!')
        return
    }
    if(badgers.killerBadger()) {
        console.log(`The badger ${badgers.killerBadger().name} killed you`)
        return
    }
    console.log(message)
    userInfo(user)
}

const frame = (user, badgers, animator, isWin=false) => {
    const gym = new Gym()
    if(isWin) gym.placeBadgers(badgers)
    else gym.placePlayers(user, badgers)
    if(animator.unexplodedGrenades()) {
        gym.placeGrenades(animator.unexplodedGrenades())
    }
    if(animator.movingShots()) {
        gym.placeShots(animator.movingShots())
    }
    console.log(`LEVEL POINTS: ${user.points}`)
    if(isWin) {
        displayWinGym(user, gym.hash)
        return
    }
    displayGym(gym.hash)
    displayDash(user, badgers, animator)
}

export default frame