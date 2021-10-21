const emptyGymHash = () => {
    const keyPipes1 = "|             |          |               |".split("");
    const keyPipes2 = "|             |          |               |".split("");
    const keyPipes3 = "|             |          |               |".split("");
    const topCircleOne = "|             |  .-\"\"-.  |               |".split("");
    const firstArcCircleOne = "|             |/`      `\\|               |".split("");
    const firstMiddleCircleOne = "|             ;          ;               |".split("");
    const secondMiddleCircleOne = "|             ;          ;               |".split("");
    const secondArcCircleOne = "|              \\        /                |".split("");
    const bottomCircleOne = "|               `'-..-'`                 |".split("");
    const justPipes1 = "|                                        |".split("");
    const justPipes2 = "|                                        |".split("");
    const justPipes3 = "|                                        |".split("");
    const midCourt = "|----------------------------------------|".split("");
    const justPipes4 = "|                                        |".split("");
    const justPipes5 = "|                                        |".split("");
    const justPipes6 = "|                                        |".split("");
    const topCircleTwo = "|                .-\"\"-.                  |".split("");
    const firstArcCircleTwo = "|              /`      `\\                |".split("");
    const firstMiddleCircleTwo = "|             ;          ;               |".split("");
    const secondMiddleCircleTwo = "|             ;          ;               |".split("");
    const secondArcCircleTwo = "|             |\\        /|               |".split("");
    const bottomCircleTwo = "|             | `'-..-'` |               |".split("");
    const keyPipes4 = "|             |          |               |".split("");
    const keyPipes5 = "|             |          |               |".split("");
    const keyPipes6 = "|             |          |               |".split("");
    return [
        keyPipes1,
        keyPipes2,
        keyPipes3,
        topCircleOne,
        firstArcCircleOne,
        firstMiddleCircleOne,
        secondMiddleCircleOne,
        secondArcCircleOne,
        bottomCircleOne,
        justPipes1,
        justPipes2,
        justPipes3,
        midCourt,
        justPipes4,
        justPipes5,
        justPipes6,
        topCircleTwo,
        firstArcCircleTwo,
        firstMiddleCircleTwo,
        secondMiddleCircleTwo,
        secondArcCircleTwo,
        bottomCircleTwo,
        keyPipes4,
        keyPipes5,
        keyPipes6,
    ];
};
export default emptyGymHash;
const emptyGym = emptyGymHash();
const gymWidth = emptyGym[0].length;
const gymHeight = emptyGym.length;
// width 42
// height 25
export const xMax = gymWidth - 2;
export const xMin = 1;
export const yMax = gymHeight - 1;
export const yMin = 0;
