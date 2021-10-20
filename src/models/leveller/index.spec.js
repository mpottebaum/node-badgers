import Leveller from './index.js'
import User from '../user.js'
import Badgers from '../badgers.js'

describe('Leveller model', () => {
    it('should reset current dead count on end turn', () => {
        const numBadgers = 1
        const user = new User(numBadgers)
        const badgers = new Badgers(numBadgers)
        const leveller = new Leveller()
        leveller.currentDeadCount = 1
        const turn = 1
        leveller.endTurnCurrentDead = turn

        leveller.processWeapons(user, badgers, turn)
        expect(leveller.currentDeadCount).toBe(0)
    })
})