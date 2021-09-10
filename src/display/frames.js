import Gym from '../models/gym.js'
import { displayGym, displayWinGym } from './displayGym.js'

const userInfo = user => {
    console.log(`Stamina: ${user.stamina}`)
    console.log(`Grenades: ${user.grenades}`)
    console.log(`Bullets: ${user.bullets}`)
}

const frame = (user, badgers, animator) => {
    const gym = new Gym()
    if(animator.hasGrenadeDead() || (animator.shot && animator.shot.dead)) {
        gym.placePlayersWithDead(user, badgers)
    } else {
        gym.placePlayers(user, badgers)
    }
    if(animator.unexplodedGrenades()) {
        gym.placeGrenades(animator.unexplodedGrenades())
    }
    if(animator.shot && animator.shot.isShooting) {
        gym.placeShot(user, animator.shot.target)
    }
    console.log(`LEVEL POINTS: ${user.points}`)
    displayGym(gym.hash)
    userInfo(user)
}

export default frame

// console.log('You missed')
// console.log('You blew yourself up!')
// console.log(`You killed ${badgers.deadBadgers().length} badgers!`)
// console.log(`You killed the badger ${badgers.deadBadgers()[0].name}`)
// console.log(`You killed the badger ${deadBadger.name}`)

export const killedFrame = (user, badgers, animator) => {
    const gym = new Gym()
    gym.placePlayersWithDead(user, badgers)
    if(animator.unexplodedGrenades()) {
        gym.placeGrenades(animator.unexplodedGrenades())
    }
    if(animator.shot && animator.shot.isShooting) {
        gym.placeShot(user, animator.shot.target)
    }
    displayGym(gym.hash)
    const killerBadger = badgers.current().find(b => b.killer)
    console.log(`The badger ${killerBadger.name} killed you`)
}

export const winFrame = (user, badgers, animator) => {
    const gym = new Gym()
    gym.placeDeadBadgers(badgers)
    if(animator.unexplodedGrenades()) {
        gym.placeGrenades(animator.unexplodedGrenades())
    }
    if(animator.shot && animator.shot.isShooting) {
        gym.placeShot(user, animator.shot.target)
    }
    displayWinGym(user, gym.hash)
}