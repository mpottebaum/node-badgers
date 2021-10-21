import emptyGymHash from '../display/emptyGymHash.js';
class Gym {
    constructor() {
        this.hash = emptyGymHash();
    }
    placePlayer(player, symbol) {
        this.hash[player.coordinates.y][player.coordinates.x] = symbol;
    }
    placePlayers(user, badgers) {
        this.placeUser(user);
        this.placeBadgers(badgers);
    }
    placeUser(user) {
        if (!user.alive)
            this.placePlayer(user, '#');
        else
            this.placePlayer(user, '&');
    }
    placeBadgers(badgers) {
        badgers.current().forEach(b => {
            if (!b.alive)
                this.placePlayer(b, '#');
            else
                this.placePlayer(b, '%');
        });
    }
    placeShot(shot) {
        if (!shot.isNew && shot.isShooting) {
            this.placePlayer(shot, '*');
        }
        else if (!shot.isNew && !shot.isShooting) {
            this.placePlayer(shot, '.');
        }
    }
    placeShots(shots) {
        shots.forEach(shot => {
            this.placeShot(shot);
        });
    }
    placeGrenade(grenade) {
        this.placePlayer(grenade, '@');
    }
    placeGrenades(grenades) {
        for (const grenade of grenades) {
            if (grenade.blast === 1)
                this.placeFirstBlast(grenade);
            else if (grenade.blast === 2)
                this.placeSecondBlast(grenade);
            else if (grenade.blast === 3)
                this.placeThirdBlast(grenade);
            else
                this.placeGrenade(grenade);
        }
    }
    placeFirstBlast(grenade) {
        this.placePlayer(grenade, '*');
    }
    placeSecondBlast(grenade) {
        grenade.secondBlastCoordinates.forEach(c => {
            this.hash[c.y][c.x] = '*';
        });
    }
    placeThirdBlast(grenade) {
        this.placeSecondBlast(grenade);
        grenade.thirdNoInvisibleCoordinates.forEach(c => {
            this.hash[c.y][c.x] = '*';
        });
    }
}
export default Gym;
