const shuffle = (arr) => {
    let j, x, index = arr.length - 1;
    while (index > 0) {
        j = Math.floor(Math.random() * (index + 1));
        x = arr[index];
        arr[index] = arr[j];
        arr[j] = x;
        index--;
    }
    return arr;
};
export default shuffle;
