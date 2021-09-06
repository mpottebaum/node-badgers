const inquirer = require('inquirer')
const clear = require('clear')
const sleep = require('../helpers/sleep')

const instructions = async () => {
    clear()
    console.log("Welcome to")
    console.log("BADGERS AND GYMS")
    await sleep(2)
    clear()
    console.log("HOW TO PLAY:")
    console.log("\n")
    console.log("Badgers -> %")
    console.log("You -> &")
    console.log("\n")
    console.log("You can escape from the gym through the exit at the top")
    console.log("Or you can kill all of the badgers")
    console.log("\n")
    console.log("Throw grenades to kill the badgers")
    console.log("Save your bullets for close-range combat")
    console.log("\n")
    console.log("To throw a grenade, first select the direction of the throw")
    console.log("represented by degrees relative to your position:")
    console.log("\n")
    console.log("            315  0  45")
    console.log("               \\ | /")
    console.log("                \\|/")
    console.log("          270 -- & -- 90")
    console.log("                /|\\")
    console.log("               / | \\")
    console.log("           225  180  135")
    console.log("\n")
    console.log("Then select a power level from one to three")
    console.log("\n")
    console.log("\n")
    console.log("The badger apocalypse is upon you")
    await inquirer.prompt([
        {
            type: 'list',
            name: 'instructions',
            message: 'Godspeed',
            choices: [
                'Continue'
            ]
        }
    ])

    return new Promise(resolve => resolve())
}

module.exports = instructions