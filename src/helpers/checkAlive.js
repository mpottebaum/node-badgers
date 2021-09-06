const checkAlive = (user, badgers) => {
    if(badgers.current().some(b => b.coordinates.x === user.coordinates.x && b.coordinates.y === user.coordinates.y)) {
        user.alive = false
    }
}

module.exports = checkAlive