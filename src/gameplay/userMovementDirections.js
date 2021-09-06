const inquirer = require('inquirer')

const userMovementDirections = async () => {
    const { direction } = await inquirer.prompt([
        {
            type: 'list',
            name: 'direction',
            message: 'Choose an action',
            choices: [
                'Up', 'Down', 'Left', 'Right'
            ]
        }
    ])
    return new Promise(resolve => resolve(direction))
}

module.exports = userMovementDirections