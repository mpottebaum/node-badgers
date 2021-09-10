const checkWin = (user, badgers) => {
    if(user.coordinates.y === 0 && [20, 21, 22, 23].includes(user.coordinates.x)) {
        user.win = true
    } else if(badgers.current().length === 0) {
        user.win = true
    }
}

const checkAlive = (user, badgers) => {
    if(badgers.current().some(b => b.coordinates.x === user.coordinates.x && b.coordinates.y === user.coordinates.y)) {
        user.alive = false
    }
}

const checkLevelEnd = (user, badgers) => {
    checkWin(user, badgers)
    checkAlive(user, badgers)
    return (!user.alive || user.win)
}

export default checkLevelEnd