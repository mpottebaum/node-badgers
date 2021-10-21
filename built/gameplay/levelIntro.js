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
import sleep from '../helpers/sleep.js';
const levelIntro = (numBadgers) => __awaiter(void 0, void 0, void 0, function* () {
    clear();
    console.log("BADGERS AND GYMS");
    console.log(`LEVEL ${numBadgers - 1}`);
    console.log("\n");
    console.log("\n");
    yield sleep(3);
    clear();
    console.log("You find yourself in a gym, but you're not alone...");
    yield sleep(1.5);
    console.log("...inside this gym there are...");
    yield sleep(1.5);
    console.log(`      ${numBadgers} BADGERS!`);
    yield sleep(1.5);
    return new Promise(resolve => resolve());
});
export default levelIntro;
