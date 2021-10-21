var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import clear from '../helpers/clear.js';
import inquirer from 'inquirer';
import frame from '../display/frame.js';
import sleep from '../helpers/sleep.js';
const levelEnd = (user, badgers, game, leveller) => __awaiter(void 0, void 0, void 0, function* () {
    clear();
    frame(user, badgers, leveller, user.alive);
    yield sleep(1.5);
    if (!user.alive) {
        console.log('Game Over!');
        game.lost = true;
    }
    else {
        console.log('You escaped the gym!');
    }
    game.score += user.points;
    console.log(`Score: ${game.score}`);
    yield inquirer.prompt([
        {
            type: 'list',
            name: 'instructions',
            message: 'Press Enter to continue',
            choices: [
                'Continue'
            ]
        }
    ]);
    return new Promise(resolve => resolve());
});
export default levelEnd;
