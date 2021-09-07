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
    const onGrenadeBlast = grenade => {
        grenade.killPlayersInBlastRadius(user, badgers)
        let result = ''
        if(!user.alive) result = 'suicide'
        else if(badgers.deadBadgers().length > 0) {
            result = 'kill'
            user.grenadeKillBadgerPoints(badgers.deadBadgers().length)
        }
        return result
    }
    const onGrenadeEnd = () => {
        badgers.removeDead()
    }
    animator.throwGrenade(onGrenadeBlast, onGrenadeEnd)
}

export default throwGrenade