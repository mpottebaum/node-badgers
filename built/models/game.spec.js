import Game from './game.js';
describe('Game model', () => {
    it('should increase turn number', () => {
        const game = new Game(2);
        game.incTurn();
        expect(game.turn).toBe(1);
    });
    it('should increase badgers number', () => {
        const game = new Game(2);
        game.incBadgers();
        expect(game.numBadgers).toBe(3);
    });
    it('should reset turn number on start', () => {
        const game = new Game(2);
        game.turn = 45;
        game.start();
        expect(game.turn).toBe(0);
    });
    it('should lose on game over', () => {
        const game = new Game(2);
        game.gameOver();
        expect(game.lost).toBeTruthy();
    });
});
