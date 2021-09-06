import sleep from '../helpers/sleep.js'
import clear from '../helpers/clear.js'
import { 
    mainFrame,
    grenadeFrame,
    grenadeBlastFrame,
    missFrame,
    grenadeKillFrame,
    shotFrame,
    shotKillFrame
} from './frames.js'


export const shotAni = async (user, badgers, target, hit=false) => {
    clear()
    mainFrame(user, badgers)
    await sleep(1.5)
    clear()
    shotFrame(user, badgers, target)
    await sleep(1.5)
    clear()
    if(hit) {
        shotKillFrame(user, badgers)
    } else {
        mainFrame(user, badgers)
    }
    await sleep(1.5)
    clear()
    if(hit) {
        shotKillFrame(user, badgers, true)
    } else {
        missFrame(user, badgers)
    }
    await sleep(1.5)
    badgers.removeDead()
    return new Promise(resolve => resolve())
}

export const grenadeAni = async (user, badgers, grenade) => {
    clear()
    grenadeFrame(user, badgers, grenade)
    await sleep(1)
    clear()
    grenade.fullMovement()
    grenadeFrame(user, badgers, grenade)
    await sleep(0.75)
    clear()
    grenade.fullMovement()
    grenadeFrame(user, badgers, grenade)
    await sleep(0.5)
    clear()
    grenade.fullMovement()
    grenadeFrame(user, badgers, grenade)
    await sleep(0.5)
    clear()
    grenadeBlastFrame(user, badgers, grenade, 1)
    await sleep(0.5)
    clear()
    grenade.setSecondBlast()
    grenadeBlastFrame(user, badgers, grenade, 2)
    await sleep(1)
    clear()
    grenade.setThirdBlast()
    grenadeBlastFrame(user, badgers, grenade, 3)
    await sleep(1)
    clear()
    grenade.killPlayersInBlastRadius(user, badgers)
    if(!user.alive) {
        grenadeKillFrame(user, badgers, true)
    } else if(badgers.deadBadgers().length > 0) {
        grenadeKillFrame(user, badgers)
        user.grenadeKillBadgerPoints(badgers.deadBadgers().length)
    } else {
        missFrame(user, badgers)
    }
    await sleep(1.5)
    badgers.removeDead()
    return new Promise(resolve => resolve())
}