const shuffle = <T>(arr: T[]) => {
    let j: number, x: T, index = arr.length - 1
    while (index > 0) {
        j = Math.floor(Math.random() * (index + 1));
        x = arr[index];
        arr[index] = arr[j];
        arr[j] = x;
        index--
    }
    return arr;
}

export default shuffle