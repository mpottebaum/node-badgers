import GameGym from '../models/gameGym.js'
import { displayGym, displayWinGym } from './gymArt.js'

const userInfo = user => {
    console.log(`Stamina: ${user.stamina}`)
    console.log(`Grenades: ${user.grenades}`)
    console.log(`Bullets: ${user.bullets}`)
}

const frame = (user, badgers, animator) => {
    const gym = new GameGym()
    if(animator.hasGrenadeDead() || animator.shotDead) {
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
    displayGym(gym.hash)
    userInfo(user)
}

export default frame

// console.log('You missed')
// console.log('You blew yourself up!')
// console.log(`You killed ${badgers.deadBadgers().length} badgers!`)
// console.log(`You killed the badger ${badgers.deadBadgers()[0].name}`)
// console.log(`You killed the badger ${deadBadger.name}`)

export const killedFrame = (user, badgers) => {
    const gym = new GameGym()
    gym.placePlayersWithDead(user, badgers)
    displayGym(gym.hash)
    const killerBadger = badgers.current().find(b => b.killer)
    console.log(`The badger ${killerBadger.name} killed you`)
}

export const winFrame = (user, badgers) => {
    const gym = new GameGym()
    gym.placeBadgers(badgers)
    displayWinGym(user, gym.hash)
}