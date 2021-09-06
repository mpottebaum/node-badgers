import GameGym from '../models/gameGym.js'
import { displayGym, displayWinGym } from './gymArt.js'

const userInfo = user => {
    console.log(`Stamina: ${user.stamina}`)
    console.log(`Grenades: ${user.grenades}`)
    console.log(`Bullets: ${user.bullets}`)
}

export const mainFrame= (user, badgers) => {
    const gym = new GameGym()
    gym.placePlayers(user, badgers)
    displayGym(gym.hash)
    userInfo(user)
}

export const grenadeFrame = (user, badgers, grenade) => {
    const gym = new GameGym()
    gym.placePlayers(user, badgers)
    gym.placeGrenade(grenade)
    displayGym(gym.hash)
}

export const grenadeBlastFrame = (user, badgers, grenade, stage) => {
    const gym = new GameGym()
    gym.placePlayers(user, badgers)
    switch(stage) {
        case 2:
            gym.placeSecondBlast(grenade)
            break;
        case 3:
            gym.placeThirdBlast(grenade)
            break;
        default:
            gym.placeFirstBlast(grenade)
    }
    displayGym(gym.hash)
}

export const missFrame = (user, badgers) => {
    mainFrame(user, badgers)
    console.log('You missed')
}

export const gymWithDeadFrame = (user, badgers) => {
    const gym = new GameGym()
    gym.placePlayersWithDead(user, badgers)
    displayGym(gym.hash)
    userInfo(user)
}

export const grenadeKillFrame = (user, badgers, isSuicide) => {
    gymWithDeadFrame(user, badgers)
    if(isSuicide) {
        console.log('You blew yourself up!')
    } else {
        if(badgers.deadBadgers().length > 1) {
            console.log(`You killed ${badgers.deadBadgers().length} badgers!`)
        } else {
            console.log(`You killed the badger ${badgers.deadBadgers()[0].name}`)
        }
    }
}

export const shotFrame = (user, badgers, target) => {
    const gym = new GameGym()
    gym.placePlayers(user, badgers)
    gym.placeShot(user, target)
    displayGym(gym.hash)
    userInfo(user)
}

export const shotKillFrame = (user, badgers, message=false) => {
    gymWithDeadFrame(user, badgers)
    if(message) {
        const deadBadger = badgers.all.find(b => !b.alive)
        console.log(`You killed the badger ${deadBadger.name}`)
    }
}

export const killedFrame = (user, badgers) => {
    gymWithDeadFrame(user, badgers)
    const killerBadger = badgers.all.find(b => b.killer)
    console.log(`The badger ${killerBadger.name} killed you`)
}

export const winFrame = (user, badgers) => {
    const gym = new GameGym()
    gym.placeBadgers(badgers)
    displayWinGym(user, gym.hash)
}