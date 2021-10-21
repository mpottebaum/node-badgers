export const displayGym = gymHash => {
    console.log(" ------------------    ------------------ ");
    gymHash.forEach(row => {
        console.log(row.join(""));
    });
    console.log(" ---------------------------------------- ");
};
export const displayWinGym = (user, gymHash) => {
    const top = " ------------------    ------------------ ".split("");
    if (user.coordinates.x <= 23 && user.coordinates.x >= 20) {
        top[user.coordinates.x] = '&';
    }
    else {
        top[21] = '&';
    }
    console.log(top.join(""));
    gymHash.forEach(row => {
        console.log(row.join(""));
    });
    console.log(" ---------------------------------------- ");
};
