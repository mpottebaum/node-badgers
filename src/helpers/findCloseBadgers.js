import { distanceBetween } from './distanceBetween.js'

const findCloseBadgers = (user, badgers) => {
    return badgers.current().filter(b => distanceBetween(user, b) < 4)
}

export default findCloseBadgers