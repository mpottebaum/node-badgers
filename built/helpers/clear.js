import ansiEscapes from 'ansi-escapes';
const clear = () => {
    process.stdin.write(ansiEscapes.clearScreen);
};
export default clear;
