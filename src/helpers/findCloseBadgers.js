const { distanceBetween } = require('./distanceBetween')

const findCloseBadgers = (user, badgers) => {
    return badgers.current().filter(b => distanceBetween(user, b) < 4)
}

module.exports = findCloseBadgers