var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import inquirer from 'inquirer';
import clear from '../helpers/clear.js';
import sleep from '../helpers/sleep.js';
import instructions from './instructions.js';
import Game from '../models/game.js';
import level from './level.js';
const fullGame = () => __awaiter(void 0, void 0, void 0, function* () {
    yield instructions();
    const game = new Game(2);
    while (!game.lost) {
        yield level(game);
        game.incBadgers();
        if (game.numBadgers > 20) {
            clear();
            console.log('CONGRATULATIONS');
            console.log('You beat BADGERS AND GYMS!');
            yield sleep(2);
            break;
        }
    }
    clear();
    const { endPrompt } = yield inquirer.prompt([
        {
            type: 'list',
            name: 'endPrompt',
            message: 'Would you like to play again?',
            choices: [
                'Yes',
                'No'
            ]
        }
    ]);
    if (endPrompt === 'Yes') {
        fullGame();
    }
    else {
        process.exit();
    }
});
export default fullGame;
