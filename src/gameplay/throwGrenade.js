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

const throwGrenade = (user, badgers, animator, turn) => {
    if(animator.grenade.isNew()) {
        animator.grenade.start(user.coordinates, turn)
        user.grenades -= 1
    }
    let result = ''
    if(animator.grenade.moveTurns && (turn >= animator.grenade.moveTurns.dead)) {
        if(!user.alive) result = 'suicide'
        else if(badgers.deadBadgers().length > 0) {
            result = 'kill'
            user.grenadeKillBadgerPoints(badgers.deadBadgers().length)
        }
    }
    const onGrenadeBlast = grenade => {
        grenade.killPlayersInBlastRadius(user, badgers)
    }
    const onGrenadeEnd = () => {
        badgers.removeDead()
    }
    animator.moveGrenade(turn, result, onGrenadeBlast, onGrenadeEnd)
}

export default throwGrenade