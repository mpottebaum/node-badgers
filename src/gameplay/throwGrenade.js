import inquirer from 'inquirer'
import { grenadeAni } from '../display/weaponsAnimations.js'
import clear from '../helpers/clear.js'
import { mainFrame } from '../display/frames.js'
import Grenade from '../models/grenade.js'

const displayGrenadeAngles = () => {
    console.log(`
        315  0  45
          \\ | /
           \\|/
      270 -- & -- 90
            /|\\
           / | \\
       225  180  135
    `)
}

const throwGrenade = (user, badgers, animator) => {
    animator.grenade.startCoordinates(user.coordinates)
    user.grenades -= 1
    const onGrenadeEnd = grenade => {
        grenade.killPlayersInBlastRadius(user, badgers)
        let result = ''
        if(!user.alive) result = 'suicide'
        else if(badgers.deadBadgers().length > 0) {
            result = 'kill'
            user.grenadeKillBadgerPoints(badgers.deadBadgers().length)
        }
        return result
    }
    animator.throwGrenade(onGrenadeEnd)
}

export default throwGrenade