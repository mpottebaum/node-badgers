import Gym from '../models/gym.js';
import { displayGym, displayWinGym } from './displayGym.js';
const userInfo = (user) => {
    console.log(`WEAPON: ${user.weapon.toUpperCase()}`);
    console.log(`Stamina: ${user.stamina}`);
    console.log(`Grenades: ${user.grenades}`);
    console.log(`Bullets: ${user.bullets}`);
};
const displayDash = (user, badgers, leveller) => {
    let message = ' ';
    if (leveller.hasMissShots() || leveller.hasMissGrenades()) {
        message = 'You missed';
    }
    if (leveller.currentDeadCount === 1) {
        message = `You killed a badger!`;
    }
    if (leveller.currentDeadCount > 1) {
        message = `You killed ${leveller.currentDeadCount} badgers!`;
    }
    if (leveller.activeGrenades().some(grenade => grenade.suicide)) {
        console.log('You blew yourself up!');
        return;
    }
    if (badgers.killerBadger()) {
        console.log(`The badger ${badgers.killerBadger().name} killed you`);
        return;
    }
    console.log(message);
    userInfo(user);
};
const frame = (user, badgers, leveller, isWin = false) => {
    const gym = new Gym();
    if (isWin)
        gym.placeBadgers(badgers);
    else
        gym.placePlayers(user, badgers);
    if (leveller.unexplodedGrenades()) {
        gym.placeGrenades(leveller.unexplodedGrenades());
    }
    if (leveller.movingShots()) {
        gym.placeShots(leveller.movingShots());
    }
    console.log(`LEVEL POINTS: ${user.points}`);
    if (isWin) {
        displayWinGym(user, gym.hash);
        return;
    }
    displayGym(gym.hash);
    displayDash(user, badgers, leveller);
};
export default frame;
