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
const instructions = () => __awaiter(void 0, void 0, void 0, function* () {
    clear();
    console.log("Welcome to");
    console.log("BADGERS AND GYMS");
    yield sleep(2);
    clear();
    console.log("HOW TO PLAY:");
    console.log("\n");
    console.log("Badgers -> %");
    console.log("You -> &");
    console.log("\n");
    console.log("You can escape from the gym through the exit at the top");
    console.log("Or you can kill all of the badgers");
    console.log("\n");
    console.log("Throw grenades to kill the badgers");
    console.log("Save your bullets for close-range combat");
    console.log("\n");
    console.log("To throw a grenade, first select the direction of the throw");
    console.log("represented by degrees relative to your position:");
    console.log("\n");
    console.log("            315  0  45");
    console.log("               \\ | /");
    console.log("                \\|/");
    console.log("          270 -- & -- 90");
    console.log("                /|\\");
    console.log("               / | \\");
    console.log("           225  180  135");
    console.log("\n");
    console.log("Then select a power level from one to three");
    console.log("\n");
    console.log("\n");
    console.log("The badger apocalypse is upon you");
    yield inquirer.prompt([
        {
            type: 'list',
            name: 'instructions',
            message: 'Godspeed',
            choices: [
                'Continue'
            ]
        }
    ]);
    return new Promise(resolve => resolve());
});
export default instructions;
