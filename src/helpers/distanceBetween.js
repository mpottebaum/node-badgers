export const yDistanceBetween = (user, badger) => badger.coordinates.y - user.coordinates.y

export const xDistanceBetween = (user, badger) => (badger.coordinates.x - user.coordinates.x) * 2

export const distanceBetween = (user, badger) => {
    const yLength = Math.abs(yDistanceBetween(user, badger))
    const xLength = Math.abs(xDistanceBetween(user, badger))
    return Math.sqrt(yLength**2 + xLength**2)
}