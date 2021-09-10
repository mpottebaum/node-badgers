const throwGrenade = (user, badgers, animator, turn) => {
    if(animator.newGrenades()) {
        animator.newGrenades().forEach(() => user.grenades -= 1)
        animator.startNewGrenades(user.coordinates, turn)
    }
    if(animator.movingGrenades()) {
        animator.grenadeCleanUp(user, badgers, turn)
    }

    animator.moveGrenades(turn)

    if(animator.hasActiveGrenades()) {
        animator.killPlayersGrenades(user, badgers, turn)
    }
}

export default throwGrenade

    //     315  0  45
    //       \\ | /
    //        \\|/
    //   270 -- & -- 90
    //         /|\\
    //        / | \\
    //    225  180  135