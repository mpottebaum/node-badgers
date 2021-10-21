import User from "../models/user"
import Badger from "../models/badger"

export const yDistanceBetween = (user: User, badger: Badger) => badger.coordinates.y - user.coordinates.y

export const xDistanceBetween = (user: User, badger: Badger) => (badger.coordinates.x - user.coordinates.x) * 2

export const distanceBetween = (user: User, badger: Badger) => {
    const yLength = Math.abs(yDistanceBetween(user, badger))
    const xLength = Math.abs(xDistanceBetween(user, badger))
    return Math.sqrt(yLength**2 + xLength**2)
}