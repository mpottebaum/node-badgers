export const yDistanceBetween = (user, badger) => badger.coordinates.y - user.coordinates.y;
export const xDistanceBetween = (user, badger) => (badger.coordinates.x - user.coordinates.x) * 2;
export const distanceBetween = (user, badger) => {
    const yLength = Math.abs(yDistanceBetween(user, badger));
    const xLength = Math.abs(xDistanceBetween(user, badger));
    return Math.sqrt(Math.pow(yLength, 2) + Math.pow(xLength, 2));
};
