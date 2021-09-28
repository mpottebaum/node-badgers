import clear from '../helpers/clear.js'
import sleep from '../helpers/sleep.js'

const levelIntro = async (numBadgers) => {
    clear()
    console.log("BADGERS AND GYMS")
    console.log(`LEVEL ${numBadgers - 1}`)
    console.log("\n")
    console.log("\n")
    await sleep(3)
    clear()
    console.log("You find yourself in a gym, but you're not alone...")
    await sleep(1.5)
    console.log("...inside this gym there are...")
    await sleep(1.5)
    console.log(`      ${numBadgers} BADGERS!`)
    await sleep(1.5)
    return new Promise(resolve => resolve())
}

export default levelIntro