const checkWin = (user, badgers) => {
    if(user.coordinates.y === 0 && [20, 21, 22, 23].includes(user.coordinates.x)) {
        user.win = true
    } else if(badgers.current().length === 0) {
        user.win = true
    }
}

module.exports = checkWin