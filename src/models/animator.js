class Animator {
    constructor() {
        this.weapon = ''
        this.dead = false
    }

    shot(target, hit=false) {
        this.weapon = ''
        this.shootTarget = target
        setTimeout(() => {
            this.shootTarget = null
            if(hit) {
                this.dead = true
                setTimeout(() => {
                    this.dead = false
                }, 1500)
            }
        }, 750)
    }
}

export default Animator