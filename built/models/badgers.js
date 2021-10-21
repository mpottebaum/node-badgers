import Badger from './badger.js';
import { distanceBetween } from '../helpers/distanceBetween.js';
import shuffle from '../helpers/shuffle.js';
const badgerNames = [
    "Balthazar",
    "Betelguese",
    "Bartholomew",
    "Balzac",
    "Blastus",
    "Bartleby",
    "Bloom",
    "Blackbeard",
    "Barnabas",
    "Beelzebub",
    "Baal",
    "Baladan",
    "Beeroth",
    "Behemoth",
    "Benjamin",
    "Bernice",
    "Bezek",
    "Buz",
    "Boanerges",
    "Boson",
];
class Badgers {
    constructor(numBadgers) {
        this.generateBadgers = (numBadgers) => {
            const names = shuffle(badgerNames).slice(0, numBadgers);
            return names.map((name) => {
                const badger = new Badger(name);
                badger.startCoordinates();
                badger.alive = true;
                return badger;
            });
        };
        this.current = () => this.badgers.filter(b => !b.deleted);
        this.alive = () => this.badgers.filter(b => b.alive);
        this.dead = () => this.badgers.filter(b => !b.alive && !b.deleted);
        this.killerBadger = () => this.badgers.find(b => b.killer);
        this.makeMoves = (user) => {
            this.alive().forEach(b => {
                if (distanceBetween(user, b) < 4) {
                    b.coordinates.y = user.coordinates.y;
                    b.coordinates.x = user.coordinates.x;
                    b.killer = true;
                }
                else {
                    b.move(user);
                    // (POSSIBLY NO SCENARIO WHERE THE BELOW WOULD BE TRUTHY)
                    // if(b.coordinates.y === user.coordinates.y && b.coordinates.x === user.coordinates.x) {
                    //     b.killer = true
                    // }
                }
            });
        };
        this.currentBadgersCoordinates = () => {
            return this.current().map(b => b.coordinates);
        };
        this.removeDead = () => {
            this.current().forEach(b => {
                if (!b.alive) {
                    b.delete();
                }
            });
        };
        this.killBadgersInBlast = (grenade) => {
            const deadBadgers = [];
            this.current().forEach(b => {
                if (b.isInBlast(grenade)) {
                    b.alive = false;
                    deadBadgers.push(b);
                }
            });
            return deadBadgers.length > 0 && deadBadgers;
        };
        this.badgers = this.generateBadgers(numBadgers);
    }
}
export default Badgers;
