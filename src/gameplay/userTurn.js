import inquirer from 'inquirer'
import throwGrenade from './throwGrenade.js'
import shootAtBadger from './shootAtBadger.js'
import userMovementDirections from './userMovementDirections.js'

const userTurn = async (user, badgers, game) => {
    console.log(`Stamina: ${user.stamina}`)
    console.log(`Grenades: ${user.grenades}`)
    console.log(`Bullets: ${user.bullets}`)
    const { selection } = await inquirer.prompt([
        {
            type: 'list',
            name: 'selection',
            message: 'Choose an action',
            choices: user.turnMenuOptions()
        }
    ])
    switch(selection) {
        case 'Run':
            const runDirection = await userMovementDirections()
            user.movement(3, runDirection)
            user.decStamina()
            if(user.stamina < 3) {
                user.tiredTurn = game.turn
            }
            if(user.stamina === 0) {
                user.tired = true
            }
            break;
        case 'Walk':
            const walkDirection = await userMovementDirections()
            user.movement(1, walkDirection)
            break;
        case 'Shoot at badger':
            await shootAtBadger(user, badgers)
            break;
        case 'Throw grenade':
            await throwGrenade(user, badgers)
            break;
    }
    return new Promise(resolve => resolve())
}

export default userTurn