import Gym from './gym.js'
import User from './user.js'
import Badgers from './badgers.js'
import Shot from './shot.js'
import Grenade from './grenade.js'

describe('Gym model', () => {
    it('should place player at coordinates with given symbol', () => {
        const gym = new Gym()
        const user = new User(2)
        const symbol = '&'

        gym.placePlayer(user, symbol)
        const {y, x} = user.coordinates

        expect(gym.hash[y][x]).toBe(symbol)
    })

    it('should place user symbol according to alive status', () => {
        const gym = new Gym()
        const user = new User(2)

        gym.placeUser(user)
        const {y, x} = user.coordinates
        expect(gym.hash[y][x]).toBe('&')

        user.alive = false
        gym.placeUser(user)
        expect(gym.hash[y][x]).toBe('#')
    })

    it('should place badger symbol according to alive status', () => {
        const gym = new Gym()
        const badgers = new Badgers(1)
        const badger = badgers.current()[0]

        gym.placeBadgers(badgers)
        const {y, x} = badger.coordinates
        expect(gym.hash[y][x]).toBe('%')

        badger.alive = false
        gym.placeBadgers(badgers)
        expect(gym.hash[y][x]).toBe('#')
    })

    it('should place players according to type', () => {
        const gym = new Gym()
        const user = new User(1)
        const badgers = new Badgers(1)
        const badger = badgers.current()[0]

        gym.placePlayers(user, badgers)
        const {y: userY, x: userX} = user.coordinates
        const {y: badgerY, x: badgerX} = badger.coordinates
        expect(gym.hash[userY][userX]).toBe('&')
        expect(gym.hash[badgerY][badgerX]).toBe('%')
    })

    it('should place shot according to shooting status', () => {
        const gym = new Gym()
        const shot = new Shot(0)
        const y = 10, x = 20
        shot.coordinates = { y, x }

        shot.isNew = false
        shot.isShooting = true
        gym.placeShot(shot)
        expect(gym.hash[y][x]).toBe('*')

        shot.isShooting = false
        gym.placeShot(shot)
        expect(gym.hash[y][x]).toBe('.')
    })

    it('should place all shots', () => {
        const gym = new Gym()
        const shotOne = new Shot(0)
        const oneY = 10, oneX = 20
        shotOne.coordinates = { y: oneY, x: oneX }
        shotOne.isNew = false
        const shotTwo = new Shot(0)
        const twoY = 10, twoX = 25
        shotTwo.coordinates = { y: twoY, x: twoX }
        shotTwo.isNew = false

        gym.placeShots([ shotOne, shotTwo ])
        expect(gym.hash[oneY][oneX]).toBe('.')
        expect(gym.hash[twoY][twoX]).toBe('.')
    })

    it('should place grenade', () => {
        const gym = new Gym()
        const grenade = new Grenade(0, 2)
        const y = 10, x = 20
        grenade.coordinates = { y, x }

        gym.placeGrenade(grenade)
        expect(gym.hash[y][x]).toBe('@')
    })

    it('should place grenades according to blast status', () => {
        const gym = new Gym()
        const grenadeOne = new Grenade(0)
        const oneY = 10, oneX = 20
        grenadeOne.coordinates = { y: oneY, x: oneX }
        const grenadeTwo = new Grenade(0)
        const twoY = 10, twoX = 25
        grenadeTwo.coordinates = { y: twoY, x: twoX }
        grenadeTwo.blast = 1
        const grenadeThree = new Grenade(0)
        const threeY = 5, threeX = 5
        grenadeThree.coordinates = { y: threeY, x: threeX }
        grenadeThree.setSecondBlast()
        const {y: threeBlastY, x: threeBlastX} = grenadeThree.secondBlastCoordinates[0]
        const grenadeFour = new Grenade(0)
        const fourY = 5, fourX = 40
        grenadeFour.coordinates = { y: fourY, x: fourX }
        grenadeFour.setSecondBlast()
        grenadeFour.setThirdBlast()
        const {y: fourBlastY, x: fourBlastX} = grenadeFour.secondBlastCoordinates[0]

        gym.placeGrenades([ grenadeOne, grenadeTwo, grenadeThree, grenadeFour])
        expect(gym.hash[oneY][oneX]).toBe('@')
        expect(gym.hash[twoY][twoX]).toBe('*')
        expect(gym.hash[threeBlastY][threeBlastX]).toBe('*')
        expect(gym.hash[fourBlastY][fourBlastX]).toBe('*')
    })

    it('should place grenade second blast points', () => {
        const gym = new Gym()
        const grenade = new Grenade(0, 2)
        const y = 10, x = 20
        grenade.coordinates = { y, x }
        grenade.setSecondBlast()
        const {y: blastY, x: blastX} = grenade.secondBlastCoordinates[0]

        gym.placeSecondBlast(grenade)
        expect(gym.hash[blastY][blastX]).toBe('*')
    })

    it('should place both second and third grenade blast points on third blast', () => {
        const gym = new Gym()
        const grenade = new Grenade(0, 2)
        const y = 10, x = 20
        grenade.coordinates = { y, x }
        grenade.setSecondBlast()
        const {y: secBlastY, x: secBlastX} = grenade.secondBlastCoordinates[0]
        grenade.setThirdBlast()
        const {y: thiBlastY, x: thiBlastX} = grenade.secondBlastCoordinates[0]

        gym.placeThirdBlast(grenade)
        expect(gym.hash[secBlastY][secBlastX]).toBe('*')
        expect(gym.hash[thiBlastY][thiBlastX]).toBe('*')
    })
})