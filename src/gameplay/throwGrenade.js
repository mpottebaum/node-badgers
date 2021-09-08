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
    if(animator.grenade.moveTurns) {
        const { dead, end } = animator.grenade.moveTurns
        if((turn === dead) || (turn === end)) {
            if(!user.alive) result = 'suicide'
            else if(badgers.deadBadgers().length > 0) result = 'kill'  
        }
        if((turn === dead) && (result === 'kill')) {
            user.grenadeKillBadgerPoints(badgers.deadBadgers().length)
        }
        if((turn === end) && badgers.deadBadgers().length > 0) {
            badgers.removeDead()
        }
    }
    animator.moveGrenade(turn, result)
    if(animator.grenade) {
        if(animator.grenade.moveTurns && (turn === animator.grenade.moveTurns.thirdBlast)) {
            animator.grenade.killPlayersInBlastRadius(user, badgers)
        }
    }
}

export default throwGrenade