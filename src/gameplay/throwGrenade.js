const inquirer = require('inquirer')
const { grenadeAni } = require('../display/weaponsAnimations')
const clear = require('clear')
const { mainFrame } = require('../display/frames')
const Grenade = require('../models/grenade')

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

const throwGrenade = async (user, badgers) => {
    clear()
    mainFrame(user, badgers)
    displayGrenadeAngles()
    const { angle, power } = await inquirer.prompt([
        {
            type: 'list',
            name: 'angle',
            message: 'Angle',
            choices: [
                0, 45, 90, 135, 180, 225, 270, 315
            ]
        },
        {
            type: 'list',
            name: 'power',
            message: 'Power',
            choices: [
                1, 2, 3
            ]
        },
    ])
    const grenade = new Grenade(angle, power)
    grenade.startCoordinates(user.coordinates)
    await grenadeAni(user, badgers, grenade)
    user.grenades -= 1
    return new Promise(resolve => resolve())
}

module.exports = throwGrenade